import { db } from "./core/db";
import { movieWorker, ratingWorker, summaryWorker } from "./queues/workers";

try {
    movieWorker.run();
    ratingWorker.run();
    summaryWorker.run();
} catch (error) {
    console.error("Error starting workers:", error);
}

db.$disconnect();
