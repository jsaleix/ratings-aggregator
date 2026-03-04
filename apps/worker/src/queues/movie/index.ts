import { Job, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { logger } from "../../shared/logger";
import PrismaMovieRepository from "../../features/movies/repositories/prisma-movie.repository";
import TMDBService from "../../features/movies/services/tmdb.service";
import PrismaMovieRequestRepository from "../../features/requests/repositories/prisma-request.repository";
import { MovieType } from "../../features/movies/types/db";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";
import { ratingQueue } from "..";
import MovieHandler, { MovieJob } from "./handler";
import { PrismaGenreRepository } from "../../features/movies/repositories/prisma-genre.repository";

const tmdbService = new TMDBService();
const genreRepository = new PrismaGenreRepository();
const movieRepository = new PrismaMovieRepository();
const movieRequestRepository = new PrismaMovieRequestRepository();

const addMovieByTMDBIdUseCase = new AddMovieByTMDBIdUseCase(
    tmdbService,
    movieRepository,
    genreRepository,
);
const movieHandler = new MovieHandler(addMovieByTMDBIdUseCase);

export const movieWorker = new Worker(
    QUEUES.movie,
    movieHandler.handle.bind(movieHandler),
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
    },
);

movieWorker.on("active", async (job: Job<MovieJob>) => {
    const { payload } = job.data;
    logger.info("Movie worker active", {
        tags: ["movie-worker", "worker"],
        payload: job.data.payload,
    });
    try {
        await movieRequestRepository.updateRequestState(
            payload.requestId,
            true,
        );
    } catch (error) {
        logger.warn("Failed to update request state", {
            tags: ["movie-worker", "worker"],
            requestId: payload.requestId,
            error: error instanceof Error ? error.message : String(error),
        });
    }
});

movieWorker.on(
    "completed",
    async (job: Job<MovieJob>, movie: MovieType | undefined) => {
        if (movie == undefined) return;
        logger.info("Movie worker completed", {
            tags: ["movie-worker", "worker"],
            payload: job.data.payload,
            movieId: movie.id,
            slug: movie.slug,
        });
        await ratingQueue.add("set-ratings", {
            type: "movie",
            payload: { id: movie.id },
            removeOnComplete: true,
            removeOnFail: true,
        });
    },
);

movieWorker.on("failed", (job, error) => {
    logger.error("Movie worker failed", {
        tags: ["movie-worker", "worker"],
        payload: job?.data.payload,
        error: error.message,
    });
});
