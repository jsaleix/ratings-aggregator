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
    console.log("---------------");
    console.log("MOVIE WORKER ACTIVE");
    const { requestId } = job.data.payload;
    console.log("Active: ", requestId);
    await movieRatingService.updateRequestState(requestId, true);
    console.log("---------------");
});

movieWorker.on(
    "completed",
    async (_: Job<MovieJob>, movie: MovieType | undefined) => {
        if (movie == undefined) return;
        console.log("---------------");
        console.log("MOVIE WORKER COMPLETED");
        // await movieHandler.gatherRatings(movie);
        console.log("GENERATED MOVIE ID =", movie.id);
        await ratingQueue.add("set-ratings", {
            type: "movie",
            payload: { id: movie.id },
        });
        console.log("---------------");
    }
);

movieWorker.on("failed", (job, error) => {
    console.log("---------------");
    console.log("MOVIE WORKER FAILED");
    console.log(
        `Request ${job?.data.payload.requestId} | TMDBID ${job?.data.payload.tmdbId}`
    );
    console.log(error.message);
    console.log("---------------");
});
