import { db } from "./core/db";

import { movieWorker } from "./queues/movie";
import { ratingWorker } from "./queues/ratings";
import { summaryWorker } from "./queues/summary";

try {
    movieWorker.run();
    ratingWorker.run();
    summaryWorker.run();
    console.log("Worker up");
} catch (error) {
    console.error("Error starting workers:", error);
}

db.$disconnect();
