import { db } from "./core/db";
import { addMovieWorker, ratingWorker, summaryWorker } from "./queues/workers";

addMovieWorker.run();
ratingWorker.run();
summaryWorker.run();

db.$disconnect();
