import { Job, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";

import { logger } from "../../shared/logger";
import { PrismaMovieJobPipelineService } from "../../shared/modules/movie-job-pipeline/services/prisma.service";
import { MOVIE_STATUS } from "../../shared/modules/movie-job-pipeline/constants";

import AIService from "../../features/summary/services/ai.service";
import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";
import { MovieRatingsSummaryType } from "../../features/summary/types/db";
import { PrismaSummaryRepository } from "../../features/summary/repositories/prisma-summary.repository";
import { ScoreService } from "../../features/summary/services/score.service";
import SummaryHandler, { SummaryJob } from "./handler";

const movieJobPipelineService = new PrismaMovieJobPipelineService();
const aiService = new AIService();
const scoreService = new ScoreService();
const summaryDbService = new PrismaSummaryRepository();
const generateMovieSummaryUseCase = new GenerateMovieSummaryUseCase(
    aiService,
    summaryDbService,
    scoreService,
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
            max: 1,
            duration: 1 * 30 * 1000,
        },
    },
);

summaryWorker.on("active", async (job: Job<SummaryJob>) => {
    logger.info("Summary worker active", {
        tags: ["summary-worker", "worker"],
        payload: job.data.payload,
    });
});

summaryWorker.on("failed", async (job, error) => {
    logger.error(`Summary worker failed ${error.message}`, {
        tags: ["summary-worker", "worker"],
        payload: job?.data.payload,
        error: error.message,
    });
    if (job?.data == undefined) return;

    await movieJobPipelineService.setFailed(
        job.data.payload.tmdb_id,
        MOVIE_STATUS.RATING,
        error.message,
    );
});

summaryWorker.on(
    "completed",
    async (job, summary: MovieRatingsSummaryType | undefined) => {
        logger.info("Summary worker completed", {
            tags: ["summary-worker", "worker"],
            payload: job.data.payload,
            summary,
        });
        await movieJobPipelineService.setComplete(job.data.payload.tmdb_id);
    },
);
