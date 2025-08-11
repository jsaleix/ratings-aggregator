import { Queue, Worker, Job } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";

import MovieHandler from "./handler";

const connection = RedisMqConnection;
const queueName = QUEUES.movie;

describe("MovieHandler Integration", () => {
    let movieQueue: Queue;
    let worker: Worker;
    const mockUseCaseService = {
        execute: jest.fn(),
    };

    beforeAll(() => {
        movieQueue = new Queue(queueName, { connection });

        const handler = new MovieHandler(
            mockUseCaseService as unknown as AddMovieByTMDBIdUseCase
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
        await movieQueue.close();
        await connection.quit();
    });

    afterEach(() => {
        mockUseCaseService.execute.mockClear();
        movieQueue.drain();
    });

    test("should handle addMovieByTMDBId ", async () => {
        mockUseCaseService.execute.mockResolvedValue({
            id: 42,
        });

        await movieQueue.add("add-movie", {
            payload: { tmdbId: 42 },
        });

        await new Promise((resolve) => worker.on("completed", resolve));
        expect(mockUseCaseService.execute).toHaveBeenCalledWith(42);
    }, 5000);
});
