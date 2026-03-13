import { Job, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { logger } from "../../shared/logger";
import { MOVIE_STATUS } from "../../shared/modules/movie-job-pipeline/constants";
import { PrismaMovieJobPipelineService } from "../../shared/modules/movie-job-pipeline/services/prisma.service";

import PrismaMovieRepository from "../../features/movies/repositories/prisma-movie.repository";
import PrismaRatingRepository from "../../features/ratings/repositories/prisma-rating.repository";
import { PrismaRatingSourceRepository } from "../../features/ratings/repositories/prisma-rating-source.repository";
import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";
import { RatingCollectorService } from "../../features/ratings/services/rating-collector.service";
import { RatingSourceService } from "../../features/ratings/services/rating-source.service";

import { summaryQueue } from "..";
import RatingHandler, { RatingJob } from "./handler";

const movieJobPipelineService = new PrismaMovieJobPipelineService();

const movieRepository = new PrismaMovieRepository();
const ratingSourceRepository = new PrismaRatingSourceRepository();
const ratingSourceService = new RatingSourceService(ratingSourceRepository);

const ratingRepository = new PrismaRatingRepository(ratingSourceService);

const ratingCollector = new RatingCollectorService();

const setMovieRatingsUseCase = new SetMovieRatings(
    movieRepository,
    ratingCollector,
    ratingRepository,
);
const ratingHandler = new RatingHandler(setMovieRatingsUseCase);

export const ratingWorker = new Worker(
    QUEUES.rating,
    ratingHandler.handle.bind(ratingHandler),
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
        limiter: {
            // Add a delay of 1 minute between jobs
            max: 1,
            duration: 1 * 60 * 1000,
        },
    },
);

ratingWorker.on("active", (job: Job<RatingJob>) => {
    logger.info("Rating worker active", {
        tags: ["rating-worker", "worker"],
        payload: job.data.payload,
    });
});

ratingWorker.on("completed", async (job: Job<RatingJob>) => {
    logger.info("Rating worker completed", {
        tags: ["rating-worker", "worker"],
        payload: job.data.payload,
    });

    const { movie_id, movie_slug, tmdb_id } = job.data.payload;
    if (!movie_id) throw new Error("No id found in payload");

    await movieJobPipelineService.setSummarizing(tmdb_id);
    await summaryQueue.add(
        "generate-summary",
        {
            payload: { movie_id, tmdb_id, movie_slug },
            type: "movie",
            removeOnComplete: true,
            removeOnFail: true,
        },
        {
            attempts: 5,
            backoff: {
                type: "fixed",
                delay: 3 * 60 * 1000,
            },
        },
    );
});

ratingWorker.on("failed", async (job, error) => {
    logger.error("Rating worker failed", {
        tags: ["rating-worker", "worker"],
        payload: job?.data.payload,
        error: error,
    });
    if (job?.data == undefined) return;

    await movieJobPipelineService.setFailed(
        job.data.payload.tmdb_id,
        MOVIE_STATUS.RATING,
        error.message,
    );
});
