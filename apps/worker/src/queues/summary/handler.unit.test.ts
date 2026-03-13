import { Job } from "bullmq";

import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";
import { MovieRatingsSummaryType } from "../../features/summary/types/db";
import SummaryHandler, { SummaryJob } from "./handler";

describe("SummaryHandler Unit", () => {
    let handler: SummaryHandler;
    let mockUseCase: jest.Mocked<GenerateMovieSummaryUseCase>;

    beforeEach(() => {
        mockUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<GenerateMovieSummaryUseCase>;

        handler = new SummaryHandler(mockUseCase);
    });

    test("should call useCase.execute with id for movie", async () => {
        mockUseCase.execute.mockResolvedValue(
            {} as unknown as MovieRatingsSummaryType,
        );

        const jobMock = {
            data: { type: "movie", payload: { movie_id: "42" } },
        } as Job<SummaryJob>;

        const result = await handler.handle(jobMock);

        expect(mockUseCase.execute).toHaveBeenCalledWith("42");
        expect(result).toEqual({});
    });

    test("should throw if id is missing", async () => {
        const jobMock = {
            data: { type: "movie", payload: { movie_id: "" } },
        } as Job<SummaryJob>;

        await expect(handler.handle(jobMock)).rejects.toThrow("Missing id");
    });

    test("should throw for series type", async () => {
        const jobMock = {
            data: { type: "series", payload: { movie_id: "42" } },
        } as Job<SummaryJob>;

        await expect(handler.handle(jobMock)).rejects.toThrow(
            "Generating series ratings summary is not implemented yet",
        );
    });

    test("should throw for unknown type", async () => {
        const jobMock = {
            data: {
                type: "anime" as SummaryJob["type"],
                payload: { movie_id: "42" },
            },
        } as Job<SummaryJob>;

        await expect(handler.handle(jobMock)).rejects.toThrow(
            "Unhandled job type: anime",
        );
    });
});
