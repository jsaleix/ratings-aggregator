import { Queue, Worker, Job } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";

import SummaryHandler from "./handler";

const connection = RedisMqConnection;
const queueName = QUEUES.summary;

describe("SummaryHandler Integration", () => {
    let summaryQueue: Queue;
    let worker: Worker;
    const mockUseCaseService = {
        execute: jest.fn(),
    };

    beforeAll(() => {
        summaryQueue = new Queue(queueName, { connection });

        const handler = new SummaryHandler(
            mockUseCaseService as unknown as GenerateMovieSummaryUseCase,
        );

        worker = new Worker(
            queueName,
            async (job: Job) => {
                await handler.handle(job);
            },
            { connection },
        );
    });

    afterAll(async () => {
        await worker.close();
        await summaryQueue.close();
        await connection.quit();
    });

    afterEach(async () => {
        await summaryQueue.drain();
        mockUseCaseService.execute.mockClear();
    });

    test("should handle generateMovieSummary", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        const completed = new Promise<void>((resolve) => {
            worker.once("completed", () => resolve());
        });

        await summaryQueue.add("generate-movie-summary-test-1", {
            type: "movie",
            payload: { movie_id: "42" },
        });

        await completed;
        expect(mockUseCaseService.execute).toHaveBeenCalledWith("42");
    }, 5000);

    test("should fail if wrong type", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        const failed = new Promise<void>((resolve) => {
            worker.once("failed", () => resolve());
        });

        await summaryQueue.add("generate-movie-summary-test-2", {
            type: "anime",
            payload: { movie_id: "47" },
        });

        await failed;
        expect(mockUseCaseService.execute).not.toHaveBeenCalled();
    }, 5000);

    test("should fail if no id is given", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        const failed = new Promise<void>((resolve) => {
            worker.once("failed", () => resolve());
        });

        await summaryQueue.add("generate-movie-summary-test-3", {
            type: "movie",
            payload: { movie_id: "" },
        });

        await failed;
        expect(mockUseCaseService.execute).not.toHaveBeenCalled();
    }, 5000);
});
