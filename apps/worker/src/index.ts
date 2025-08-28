import "./core/sentry";
import Sentry from "@sentry/node";
import { db } from "./core/db";

import { movieWorker } from "./queues/movie";
import { ratingWorker } from "./queues/ratings";
import { summaryWorker } from "./queues/summary";

try {
    console.log("Worker up");
    movieWorker.run();
    ratingWorker.run();
    summaryWorker.run();
} catch (error) {
    console.error("Error starting workers:", error);
    Sentry.captureException(error);
}

db.$disconnect();
