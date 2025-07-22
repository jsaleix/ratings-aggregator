import { Job, Queue, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../config/bullmq";
import { db } from "../core/db";

import MovieService from "../features/movies/services/movies.service";
import TMDBService from "../features/movies/services/tmdb.service";
import RatingService from "../features/ratings/services/rating.service";

import MovieHandler, { MovieJob } from "./handlers/movie";
import RatingHandler from "./handlers/rating";
import MovieRequestService from "../features/requests/services/request";
import { MovieType } from "../features/movies/types/db";

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

movieWorker.on(
    "completed",
    async (job: Job<MovieJob>, movie: MovieType | undefined) => {
        const { tmdbId } = job.data.payload;
        if (movie == undefined) return;
        await movieRatingService.updateRequestState(tmdbId, true);
        await movieHandler.gatherRatings(movie);
    }
);

export const ratingWorker = new Worker(
    QUEUES.rating,
    ratingHandler.handle.bind(ratingHandler),
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
    }
);

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
