import { Queue, Worker, Job } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";

import MovieHandler, { MovieJob } from "./handler";

const connection = RedisMqConnection;
const queueName = QUEUES.movie;

describe("MovieHandler BullMQ Integration", () => {
    let movieQueue: Queue<MovieJob>;
    let worker: Worker<MovieJob>;
    const mockUseCaseService = {
        execute: jest.fn(),
    };

    beforeAll(() => {
        movieQueue = new Queue<MovieJob>(queueName, { connection });

        const handler = new MovieHandler(
            mockUseCaseService as unknown as AddMovieByTMDBIdUseCase,
        );

        worker = new Worker<MovieJob>(
            queueName,
            async (job: Job<MovieJob>) => {
                return await handler.handle(job);
            },
            { connection },
        );
    });

    afterAll(async () => {
        await worker.close();
        await movieQueue.close();
        await connection.quit();
    });

    beforeEach(async () => {
        mockUseCaseService.execute.mockClear();
        await movieQueue.drain();
    });

    test("should process movie job with correct payload", async () => {
        const mockMovie = { id: 42, title: "Test Movie" };
        mockUseCaseService.execute.mockResolvedValue(mockMovie);

        await movieQueue.add("add-movie", {
            payload: { requestId: "req-1", tmdbId: 42 },
        });

        await new Promise<void>((resolve) => {
            worker.once("completed", (job: Job<MovieJob>) => {
                resolve();
            });
        });

        expect(mockUseCaseService.execute).toHaveBeenCalledWith(42);
        expect(mockUseCaseService.execute).toHaveBeenCalledTimes(1);
    }, 10000);

    test("should handle job failures gracefully", async () => {
        const error = new Error("Use case failed");
        mockUseCaseService.execute.mockRejectedValue(error);

        await movieQueue.add("add-movie", {
            payload: { requestId: "req-2", tmdbId: 100 },
        });

        await new Promise<void>((resolve) => {
            worker.once("failed", () => {
                resolve();
            });
        });

        expect(mockUseCaseService.execute).toHaveBeenCalledWith(100);
    }, 10000);
});
