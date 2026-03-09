import { Job } from "bullmq";

import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";
import RatingHandler from "./handler";

describe("RatingHandler Unit", () => {
    let handler: RatingHandler;
    let mockUseCase: jest.Mocked<SetMovieRatings>;

    beforeEach(() => {
        mockUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<SetMovieRatings>;

        handler = new RatingHandler(mockUseCase);
    });

    test("should call useCase.execute with id for movie", async () => {
        mockUseCase.execute.mockResolvedValue([]);

        const jobMock = {
            data: { type: "movie", payload: { movie_id: "42" } },
        } as Job<any>;

        const result = await handler.handle(jobMock);

        expect(mockUseCase.execute).toHaveBeenCalledWith("42");
        expect(result).toEqual([]);
    });

    test("should throw if id is missing", async () => {
        const jobMock = {
            data: { type: "movie", payload: { movie_id: "" } },
        } as Job<any>;

        await expect(handler.handle(jobMock)).rejects.toThrow("Missing id");
    });

    test("should throw for unknown type", async () => {
        const jobMock = {
            data: { type: "series", payload: { movie_id: "42" } },
        } as Job<any>;

        await expect(handler.handle(jobMock)).rejects.toThrow("Unknown type");
    });
});
