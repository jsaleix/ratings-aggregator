import { Job, Queue, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { db } from "../../core/db";
import MovieService from "../../features/movies/services/movies.service";
import TMDBService from "../../features/movies/services/tmdb.service";
import MovieHandler, { MovieJob } from "./handler";
import MovieRequestService from "../../features/requests/services/request";
import { MovieType } from "../../features/movies/types/db";
import { ratingQueue } from "..";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";
import { logger } from "@sentry/node";

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
    // console.log("---------------");
    // console.log("MOVIE WORKER ACTIVE");
    // console.log("Active: ", requestId);
    // console.log("---------------");
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
        // console.log("---------------");
        // console.log("MOVIE WORKER COMPLETED");
        // console.log("GENERATED MOVIE ID =", movie.id);
        // console.log("---------------");
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
    // console.log("---------------");
    // console.log("MOVIE WORKER FAILED");
    // console.log(
    //     `Request ${job?.data.payload.requestId} | TMDBID ${job?.data.payload.tmdbId}`
    // );
    // console.log(error.message);
    // console.log("---------------");
    logger.error("Movie worker failed", {
        tags: ["movie-worker", "worker"],
        payload: job?.data.payload,
        error: error.message,
    });
});
