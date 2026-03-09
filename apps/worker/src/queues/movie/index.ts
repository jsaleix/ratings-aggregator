import { Job, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { logger } from "../../shared/logger";
import { PrismaMovieJobPipelineService } from "../../shared/modules/movie-job-pipeline/services/prisma.service";
import { MOVIE_STATUS } from "../../shared/modules/movie-job-pipeline/constants";

import PrismaMovieRepository from "../../features/movies/repositories/prisma-movie.repository";
import TMDBService from "../../features/movies/services/tmdb.service";
import { MovieType } from "../../features/movies/types/db";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";
import { PrismaGenreRepository } from "../../features/movies/repositories/prisma-genre.repository";
import { ratingQueue } from "..";
import MovieHandler, { MovieJob } from "./handler";
import PrismaMovieRequestRepository from "../../shared/modules/movie-requests/repositories/prisma-request.repository";

const movieJobPipelineService = new PrismaMovieJobPipelineService();
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
        await movieJobPipelineService.setFetching(payload.tmdbId);
    } catch (error) {
        logger.warn("Failed to update request state or movieJobPipeline", {
            tags: ["movie-worker", "worker"],
            payload,
            error: error instanceof Error ? error.message : String(error),
        });
    }
});

movieWorker.on(
    "completed",
    async (job: Job<MovieJob>, movie: MovieType | undefined) => {
        if (movie == undefined) return;
        const request_id = job.data.payload.requestId;
        const tmdb_id = job.data.payload.tmdbId;
        const movie_id = movie.id;
        const movie_slug = movie.slug;

        logger.info("Movie worker completed", {
            tags: ["movie-worker", "worker"],
            payload: { request_id, tmdb_id, movie_id, movie_slug },
        });
        await movieJobPipelineService.setRating(tmdb_id);
        await ratingQueue.add("set-ratings", {
            type: "movie",
            payload: { movie_id, movie_slug, tmdb_id },
            removeOnComplete: true,
            removeOnFail: true,
        });
    },
);

movieWorker.on("failed", async (job, error) => {
    logger.error("Movie worker failed", {
        tags: ["movie-worker", "worker"],
        payload: job?.data.payload,
        error: error.message,
    });
    if (job?.data == undefined) return;

    await movieJobPipelineService.setFailed(
        job.data.payload.tmdbId,
        MOVIE_STATUS.FETCHING,
        error.message,
    );
});
