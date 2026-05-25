import { Queue } from "bullmq";

import { QUEUES, RedisMqConnection } from "../config/bullmq";

export const movieQueue = new Queue(QUEUES.movie, {
    connection: RedisMqConnection,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    },
});

export const ratingQueue = new Queue(QUEUES.rating, {
    connection: RedisMqConnection,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    },
});

export const summaryQueue = new Queue(QUEUES.summary, {
    connection: RedisMqConnection,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    },
});
