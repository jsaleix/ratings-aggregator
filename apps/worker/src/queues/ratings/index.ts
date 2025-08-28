import { Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { db } from "../../core/db";

import MovieService from "../../features/movies/services/movies.service";
import RatingService from "../../features/ratings/services/rating.service";
import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";
import { RatingCollectorService } from "../../features/ratings/services/rating-collector.service";

import { summaryQueue } from "..";
import RatingHandler from "./handler";
import { logger } from "@sentry/node";

const movieService = new MovieService(db);
const ratingService = new RatingService(db);
const ratingCollector = new RatingCollectorService(ratingService);

const setMovieRatingsUseCase = new SetMovieRatings(
    movieService,
    ratingCollector
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
    }
);

ratingWorker.on("active", (job) => {
    // console.log("---------------");
    // console.log("RATING WORKER ACTIVE");
    // const { id } = job.data.payload;
    // console.log("Movie Id:", id);
    // console.log("---------------");
    logger.info("Rating worker active", {
        tags: ["rating-worker", "worker"],
        payload: job.data.payload,
        movieId: job.data.payload.id,
    });
});

ratingWorker.on("completed", (job) => {
    logger.info("Rating worker completed", {
        tags: ["rating-worker", "worker"],
        payload: job.data.payload,
        movieId: job.data.payload.id,
    });

    // console.log("---------------");
    // console.log("RATING WORKER COMPLETED");
    // console.log("---------------");

    const { id } = job.data.payload;
    if (!id) {
        console.log("No id from payload");
    } else {
        movieService.updateMovie(id, {
            updated_at: new Date().toISOString(),
        });
        summaryQueue.add(
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
                    delay: 5 * 60 * 1000,
                },
            }
        );
    }
});

ratingWorker.on("failed", (job, error) => {
    // console.log("---------------");
    // console.log("RATING WORKER FAILED");
    // console.log(`MovieID ${job?.data.payload.id}`);
    // console.log(error.message);
    // console.log("---------------");
    logger.error("Rating worker failed", {
        tags: ["rating-worker", "worker"],
        payload: job?.data.payload,
        movieId: job?.data.payload.id,
        error: error.message,
    });
});
