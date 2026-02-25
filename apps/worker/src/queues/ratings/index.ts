import { Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { logger } from "../../shared/logger";

import PrismaMovieRepository from "../../features/movies/repositories/prisma-movie.repository";
import PrismaRatingRepository from "../../features/ratings/repositories/prisma-rating.repository";
import { PrismaRatingSourceRepository } from "../../features/ratings/repositories/prisma-rating-source.repository";
import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";
import { RatingCollectorService } from "../../features/ratings/services/rating-collector.service";

import { summaryQueue } from "..";
import RatingHandler from "./handler";
import { RatingSourceService } from "../../features/ratings/services/rating-source.service";

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

ratingWorker.on("active", (job) => {
    logger.info("Rating worker active", {
        tags: ["rating-worker", "worker"],
        payload: job.data.payload,
        movieId: job.data.payload.id,
    });
});

ratingWorker.on("completed", async (job) => {
    logger.info("Rating worker completed", {
        tags: ["rating-worker", "worker"],
        payload: job.data.payload,
        movieId: job.data.payload.id,
    });

    const { id } = job.data.payload;
    if (!id) throw new Error("No id found in payload");

    await movieRepository.updateMovie(id, {
        updated_at: new Date().toISOString(),
    });
    await summaryQueue.add(
        "generate-summary",
        {
            payload: { id },
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

ratingWorker.on("failed", (job, error) => {
    logger.error("Rating worker failed", {
        tags: ["rating-worker", "worker"],
        payload: job?.data.payload,
        movieId: job?.data.payload.id,
        error: error,
    });
});
