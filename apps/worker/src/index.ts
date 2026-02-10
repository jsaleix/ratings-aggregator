import "./core/sentry";

import { movieWorker } from "./queues/movie";
import { ratingWorker } from "./queues/ratings";
import { summaryWorker } from "./queues/summary";
import { logger } from "./shared/logger";
import { db } from "./core/db";

try {
    console.log("Worker up!");
    movieWorker.run();
    ratingWorker.run();
    summaryWorker.run();
} catch (error) {
    logger.error("Error starting workers:", { error });
    logger.captureException(error);
}

db.$disconnect();
