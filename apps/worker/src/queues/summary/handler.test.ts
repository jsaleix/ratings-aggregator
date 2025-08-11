import { Queue, Worker, Job } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";

import MovieHandler from "./handler";

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

        const handler = new MovieHandler(
            mockUseCaseService as unknown as GenerateMovieSummaryUseCase
        );

        worker = new Worker(
            queueName,
            async (job: Job) => {
                await handler.handle(job);
            },
            { connection }
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

    test("should handle generateMovieSummary ", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        await summaryQueue.add("generate-movie-summary-test-1", {
            type: "movie",
            payload: { id: 42 },
        });

        await new Promise((resolve) => worker.on("completed", resolve));
        expect(mockUseCaseService.execute).toHaveBeenCalledWith(42);
    }, 5000);

    test("should throw if wrong type", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        await summaryQueue.add("generate-movie-summary-test-2", {
            type: "anime",
            payload: { id: 47 },
        });

        await new Promise((resolve) => worker.on("failed", resolve));
        expect(mockUseCaseService.execute).not.toHaveBeenCalled();
    }, 5000);

    test("should throw if no id is given", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        await summaryQueue.add("generate-movie-summary-test-3", {
            type: "movie",
            payload: { id: undefined },
        });

        await new Promise((resolve) => worker.on("failed", resolve));
        expect(mockUseCaseService.execute).not.toHaveBeenCalled();
    }, 5000);
});
