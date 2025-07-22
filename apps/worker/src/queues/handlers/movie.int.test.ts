import { Queue, Worker, Job } from "bullmq";
import MovieService from "../../features/movies/services/movies.service";
import MovieHandler from "./movie";
import { QUEUES, RedisMqConnection } from "../../config/bullmq";

const connection = RedisMqConnection;

describe("MovieHandler Integration", () => {
    let movieQueue: Queue;
    let ratingQueue: Queue;
    let worker: Worker;
    const mockMovieService = {
        addMovieByTMDBId: jest.fn(),
        addMovieByName: jest.fn(),
    };

    beforeAll(() => {
        movieQueue = new Queue(QUEUES.movie, { connection });
        ratingQueue = new Queue(QUEUES.rating, { connection });

        const handler = new MovieHandler(
            ratingQueue,
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
        await ratingQueue.close();
        await connection.quit();
    });

    afterEach(() => {
        movieQueue.drain();
        ratingQueue.drain();
    });

    test("should handle addMovieByTMDBId ", async () => {
        mockMovieService.addMovieByTMDBId.mockResolvedValue({
            id: 42,
            title: "Inception",
        });

        await movieQueue.add("add-movie", {
            type: "add-movie:tmdbId",
            payload: { tmdbId: 42 },
        });

        await new Promise((resolve) => worker.on("completed", resolve));
        expect(mockMovieService.addMovieByTMDBId).toHaveBeenCalledWith(42);
    });

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
