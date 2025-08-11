import { Queue, Worker, Job } from "bullmq";
import MovieService from "../../features/movies/services/movies.service";
import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import MovieHandler from "./handler";

const connection = RedisMqConnection;

describe("MovieHandler Integration", () => {
    let movieQueue: Queue;
    let worker: Worker;
    const mockMovieService = {
        addMovieByTMDBId: jest.fn(),
    };

    beforeAll(() => {
        movieQueue = new Queue(QUEUES.movie, { connection });

        const handler = new MovieHandler(
            mockMovieService as unknown as MovieService
        );

        worker = new Worker(
            QUEUES.movie,
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
        movieQueue.drain();
    });

    test("should handle addMovieByTMDBId ", async () => {
        mockMovieService.addMovieByTMDBId.mockResolvedValue({
            id: 42,
        });

        await movieQueue.add("add-movie", {
            payload: { tmdbId: 42 },
        });

        await new Promise((resolve) => worker.on("completed", resolve));
        expect(mockMovieService.addMovieByTMDBId).toHaveBeenCalledWith(42);
    }, 5000);

    // test("should handle addMovieWithRatingsByTMDBId and enqueue rating jobs", async () => {
    //     mockMovieService.addMovieByTMDBId.mockResolvedValue({
    //         id: 42,
    //         title: "Inception",
    //     });

    //     await movieQueue.add("add-movie", {
    //         type: "add-movie-with-ratings:tmdbId",
    //         payload: { tmdbId: 42 },
    //     });

    //     await new Promise((resolve) => worker.on("completed", resolve));

    //     expect(mockMovieService.addMovieByTMDBId).toHaveBeenCalledWith(42);

    //     const ratingJobs = await ratingQueue.getJobs();
    //     const jobNames = ratingJobs.map((j) => j.name);
    //     expect(jobNames.sort()).toEqual(
    //         [
    //             "set-rating:rotten:42",
    //             "set-rating:imdb:42",
    //             "set-rating:letterboxd:42",
    //         ].sort()
    //     );
    // });
});
