"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./core/db");
const workers_1 = require("./queues/workers");
workers_1.addMovieWorker.run();
workers_1.ratingWorker.run();
workers_1.summaryWorker.run();
db_1.db.$disconnect();
