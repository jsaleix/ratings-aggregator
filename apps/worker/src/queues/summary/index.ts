import { Job, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";

import AIService from "../../features/summary/services/ai.service";
import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";
import SummaryHandler, { SummaryJob } from "./handler";
import { MovieRatingSummaryType } from "../../features/summary/types/db";
import { logger } from "../../shared/logger";
import { PrismaSummaryRepository } from "../../features/summary/repositories/prisma-summary.repository";
import PrismaMovieRepository from "../../features/movies/repositories/prisma-movie.repository";
import { ScoreService } from "../../features/summary/services/score.service";

const aiService = new AIService();
const scoreService = new ScoreService();
const movieService = new PrismaMovieRepository();
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
        movieId: job.data.payload.id,
    });
});

summaryWorker.on("failed", (job, error) => {
    logger.error(`Summary worker failed ${error.message}`, {
        tags: ["summary-worker", "worker"],
        payload: job?.data.payload,
        error: error.message,
        movieId: job?.data.payload.id,
    });
});

summaryWorker.on(
    "completed",
    async (job, summary: MovieRatingSummaryType | undefined) => {
        logger.info("Summary worker completed", {
            tags: ["summary-worker", "worker"],
            payload: job.data.payload,
            summary,
            movieId: job.data.payload.id,
        });
        await movieService.updateMovie(job.data.payload.id, {
            updated_at: new Date().toISOString(),
        });
    },
);
