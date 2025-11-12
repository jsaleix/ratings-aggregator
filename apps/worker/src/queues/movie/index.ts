import { Job, Queue, Worker } from "bullmq";
import { logger } from "@sentry/node";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { db } from "../../core/db";
import MovieService from "../../features/movies/services/movies.service";
import TMDBService from "../../features/movies/services/tmdb.service";
import MovieRequestService from "../../features/requests/services/request";
import { MovieType } from "../../features/movies/types/db";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";
import { ratingQueue } from "..";
import MovieHandler, { MovieJob } from "./handler";

const tmdbService = new TMDBService();
const movieService = new MovieService(db);
const movieRatingService = new MovieRequestService(db);

const addMovieByTMDBIdUseCase = new AddMovieByTMDBIdUseCase(
    tmdbService,
    movieService
);
const movieHandler = new MovieHandler(addMovieByTMDBIdUseCase);

export const movieWorker = new Worker(
    QUEUES.movie,
    movieHandler.handle.bind(movieHandler),
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
    }
);

movieWorker.on("active", async (job: Job<MovieJob>) => {
    const { payload } = job.data;
    logger.info("Movie worker active", {
        tags: ["movie-worker", "worker"],
        payload: job.data.payload,
    });
    await movieRatingService.updateRequestState(payload.requestId, true);
});

movieWorker.on(
    "completed",
    async (job: Job<MovieJob>, movie: MovieType | undefined) => {
        if (movie == undefined) return;
        logger.info("Movie worker completed", {
            tags: ["movie-worker", "worker"],
            payload: job.data.payload,
            movie,
            movieId: movie.id,
        });
        await ratingQueue.add("set-ratings", {
            type: "movie",
            payload: { id: movie.id },
            removeOnComplete: true,
            removeOnFail: true,
        });
    }
);

movieWorker.on("failed", (job, error) => {
    logger.error("Movie worker failed", {
        tags: ["movie-worker", "worker"],
        payload: job?.data.payload,
        error: error.message,
    });
});
