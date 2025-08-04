import { Job, Queue, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../config/bullmq";
import { db } from "../core/db";

import MovieService from "../features/movies/services/movies.service";
import TMDBService from "../features/movies/services/tmdb.service";
import RatingService from "../features/ratings/services/rating.service";
import MovieRequestService from "../features/requests/services/request";
import { MovieType } from "../features/movies/types/db";

import MovieHandler, { MovieJob } from "./handlers/movie";
import RatingHandler from "./handlers/rating";

const ratingQueue = new Queue(QUEUES.rating, {
    connection: RedisMqConnection,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    },
});

const tmdbService = new TMDBService();
const movieService = new MovieService(db, tmdbService);
const ratingService = new RatingService(db);
const movieRatingService = new MovieRequestService(db);

const movieHandler = new MovieHandler(ratingQueue, movieService);
const ratingHandler = new RatingHandler(movieService, ratingService);

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
    const { requestId } = job.data.payload;
    console.log("Active: ", requestId);
    await movieRatingService.updateRequestState(requestId, true);
    console.log("---------------");
});

movieWorker.on(
    "completed",
    async (_: Job<MovieJob>, movie: MovieType | undefined) => {
        if (movie == undefined) return;
        await movieHandler.gatherRatings(movie);
    }
);

movieWorker.on("failed", (job, error) => {
    console.log("---------------");
    console.log("MovieWorker failed:");
    console.log(
        `Type: ${job?.data.type} | Request ${job?.data.payload.requestId} | TMDBID ${job?.data.payload.tmdbId}`
    );
    console.log(error.message);
    console.log("---------------");
});

export const ratingWorker = new Worker(
    QUEUES.rating,
    ratingHandler.handle.bind(ratingHandler),
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
    }
);

ratingWorker.on("failed", (job, error) => {
    console.log("---------------");
    console.log("RatingWorker failed:");
    console.log(
        `Type: ${job?.data.type} | MovieID ${job?.data.payload.movieId}`
    );
    console.log(error.message);
    console.log("---------------");
});

export const summaryWorker = new Worker(
    QUEUES.summary,
    async (_) => {
        console.log("Summary handler not implemented yet");
    },
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
    }
);
