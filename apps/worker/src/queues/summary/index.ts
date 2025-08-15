import { Job, Worker } from "bullmq";

import { db } from "../../core/db";
import { QUEUES, RedisMqConnection } from "../../config/bullmq";

import AIService from "../../features/summary/services/ai.service";
import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";
import { DBService as SummaryDBService } from "../../features/summary/services/db.service";
import SummaryHandler, { SummaryJob } from "./handler";
import { MovieRatingSummaryType } from "../../features/summary/types/db";

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
    (_, summary: MovieRatingSummaryType | undefined) => {
        console.log("---------------");
        console.log("SUMMARY WORKER COMPLETED");
        if (summary) console.log(summary.id);
        else console.log("Something wrong happened: no summary returned");
        console.log("---------------");
    }
);
