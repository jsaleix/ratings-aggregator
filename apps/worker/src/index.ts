import { Worker, Job, Queue } from "bullmq";
import IORedis from "ioredis";

import { redisConfig } from "./config/redis";

import { addMovieAndReview } from "./features/ratings";
import { generateRatingsSummary } from "./features/ai";

const connection = new IORedis({
    ...redisConfig,
    maxRetriesPerRequest: null,
});

type JobDataType = {
    type: "add-movie" | "generate-summary";
    payload: {
        movieId: string;
    };
};

const handlers = {
    "add-movie": async ({ movieId }: JobDataType["payload"]) => {
        await addMovieAndReview(movieId);
    },
    "generate-summary": async () => {
        await generateRatingsSummary();
    },
};

const worker = new Worker(
    "main-queue",
    async (job: Job<JobDataType>) => {
        const { type, payload } = job.data;
        const handler = handlers[type];

        if (!handler) {
            throw new Error(`❌ Unknown job type: ${type}`);
        }

        console.log(`🎬 Processing job [${job.id}] of type "${type}"`);
        await handler(payload);
        console.log(`✅ Job [${job.id}] completed`);
    },
    {
        connection,
        concurrency: 1,
    }
);

// const queue = new Queue<JobDataType>("main-queue", {
//     connection,
// });

// queue.add("test", {
//     type: "add-movie",
//     payload: {
//         movieId: "test",
//     },
// });
