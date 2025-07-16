import IORedis from "ioredis";
import { redisConfig } from "./redis";

export const RedisMqConnection = new IORedis({
    ...redisConfig,
    maxRetriesPerRequest: null,
});

export const QUEUES = {
    movie: "movie-queue",
    rating: "rating-queue",
    summary: "summary-queue",
} as const;
