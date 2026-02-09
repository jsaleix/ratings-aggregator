import { Job } from "bullmq";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";
import MovieHandler, { MovieJob } from "./handler";
import { MovieType } from "../../features/movies/types/db";

describe("MovieHandler Unit", () => {
    let handler: MovieHandler;
    let mockUseCase: jest.Mocked<AddMovieByTMDBIdUseCase>;

    beforeEach(() => {
        mockUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<AddMovieByTMDBIdUseCase>;

        handler = new MovieHandler(mockUseCase);
    });

    test("should call useCase.execute with tmdbId and return movie", async () => {
        const movieMock = {
            id: 42,
            title: "Test Movie",
        } as unknown as MovieType;
        mockUseCase.execute.mockResolvedValue(movieMock);

        const jobMock = {
            data: {
                payload: { requestId: "req-1", tmdbId: 42 },
            },
        } as Job<MovieJob>;

        const result = await handler.handle(jobMock);

        expect(mockUseCase.execute).toHaveBeenCalledWith(42);
        expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
        expect(result).toEqual(movieMock);
    });

    test("should propagate use case errors", async () => {
        const error = new Error("Use case failed");
        mockUseCase.execute.mockRejectedValue(error);

        const jobMock = {
            data: {
                payload: { requestId: "req-1", tmdbId: 42 },
            },
        } as Job<MovieJob>;

        await expect(handler.handle(jobMock)).rejects.toThrow(
            "Use case failed",
        );
    });
});
