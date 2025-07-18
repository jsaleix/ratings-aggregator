import { Queue, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { db } from "../../core/db";

import MovieService from "../../features/movies/services/movies.service";
import TMDBService from "../../features/movies/services/tmdb.service";
import RatingService from "../../features/ratings/services/rating.service";

import MovieHandler from "../handlers/movie";
import RatingHandler from "../handlers/rating";

const ratingQueue = new Queue(QUEUES.rating, {
    connection: RedisMqConnection,
});

const tmdbService = new TMDBService();
const movieService = new MovieService(db, tmdbService);
const ratingService = new RatingService(db);

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
