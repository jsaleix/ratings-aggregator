import { Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";

import { movieHandler } from "../handlers/movie";
import { ratingHandler } from "../handlers/rating";

export const addMovieWorker = new Worker(QUEUES.movie, movieHandler, {
    connection: RedisMqConnection,
    concurrency: 1,
    autorun: false,
});

export const ratingWorker = new Worker(QUEUES.rating, ratingHandler, {
    connection: RedisMqConnection,
    concurrency: 1,
    autorun: false,
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
