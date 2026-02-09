import { Queue, Worker, Job } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";

import RatingHandler from "./handler";

const connection = RedisMqConnection;
const queueName = QUEUES.rating;

describe("RatingHandler Integration", () => {
    let ratingQueue: Queue;
    let worker: Worker;
    const mockUseCaseService = {
        execute: jest.fn(),
    };

    beforeAll(() => {
        ratingQueue = new Queue(queueName, { connection });

        const handler = new RatingHandler(
            mockUseCaseService as unknown as SetMovieRatings
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
        await ratingQueue.close();
        await connection.quit();
    });

    afterEach(async () => {
        await ratingQueue.drain();
        mockUseCaseService.execute.mockClear();
    });

    test("should handle saveMovieRatings", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        const completed = new Promise<void>((resolve) => {
            worker.once("completed", () => resolve());
        });

        await ratingQueue.add("save-movie-ratings-test-1", {
            type: "movie",
            payload: { id: "42" },
        });

        await completed;
        expect(mockUseCaseService.execute).toHaveBeenCalledWith("42");
    }, 5000);

    test("should fail if wrong type", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        const failed = new Promise<void>((resolve) => {
            worker.once("failed", () => resolve());
        });

        await ratingQueue.add("save-movie-ratings-test-2", {
            type: "series",
            payload: { id: "47" },
        });

        await failed;
        expect(mockUseCaseService.execute).not.toHaveBeenCalled();
    }, 8000);

    test("should fail if no id is given", async () => {
        mockUseCaseService.execute.mockResolvedValue([]);

        const failed = new Promise<void>((resolve) => {
            worker.once("failed", () => resolve());
        });

        await ratingQueue.add("save-movie-ratings-test-3", {
            type: "movie",
            payload: { id: "" },
        });

        await failed;
        expect(mockUseCaseService.execute).not.toHaveBeenCalled();
    }, 8000);
});
