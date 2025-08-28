import { Job, Worker } from "bullmq";

import { db } from "../../core/db";
import { QUEUES, RedisMqConnection } from "../../config/bullmq";

import AIService from "../../features/summary/services/ai.service";
import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";
import { DBService as SummaryDBService } from "../../features/summary/services/db.service";
import SummaryHandler, { SummaryJob } from "./handler";
import { MovieRatingSummaryType } from "../../features/summary/types/db";
import TooManyRequestsError from "../../features/summary/errors/too-many-requests";

const aiService = new AIService();
const summaryDbService = new SummaryDBService(db);
const generateMovieSummaryUseCase = new GenerateMovieSummaryUseCase(
    aiService,
    summaryDbService
);

const summaryHandler = new SummaryHandler(generateMovieSummaryUseCase);

export const summaryWorker = new Worker(
    QUEUES.summary,
    summaryHandler.handle.bind(summaryHandler),
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
        limiter: {
            // Add a delay of 5 minutes between jobs
            max: 1,
            duration: 5 * 60 * 1000,
        },
    }
);

summaryWorker.on("active", async (job: Job<SummaryJob>) => {
    console.log("---------------");
    console.log("SUMMARY WORKER ACTIVE");
    console.log(`TYPE ${job?.data.type} | ID ${job?.data.payload.id}`);
    console.log("---------------");
});

summaryWorker.on("failed", (job, error) => {
    console.log("---------------");
    console.log("SUMMARY WORKER FAILED");
    console.log(`TYPE ${job?.data.type} | ID ${job?.data.payload.id}`);
    console.log(error.message);
    console.log("---------------");
});

summaryWorker.on(
    "completed",
    (job, summary: MovieRatingSummaryType | undefined) => {
        console.log("---------------");
        console.log("SUMMARY WORKER COMPLETED");
        console.log(`ID ${job?.data.payload.id}`);
        if (summary) console.log(summary.id);
        else console.log("Something wrong happened: no summary returned");
        console.log("---------------");
    }
);
