import { RatingType } from "../../ratings/types/db";
import AIService from "../services/ai.service";
import { DBService } from "../services/db.service";
import { GenerateMovieSummaryUseCase } from "./generate-summary";

describe("UseCase GenerateSummary", () => {
    let aiService: jest.Mocked<AIService>;
    let dbService: jest.Mocked<DBService>;
    let useCase: GenerateMovieSummaryUseCase;

    const ratings = [
        {
            id: "r1",
            rating_source: "Allociné",
            value: "7",
            rating_unit: "stars",
            sourceUrl: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: "r2",
            rating_source: "Allociné Audience",
            value: "8",
            rating_unit: "stars",
            sourceUrl: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ] satisfies RatingType[];

    beforeEach(() => {
        aiService = {
            sendRequest: jest.fn(),
        } as any;

        dbService = {
            getRatingsByMovieId: jest.fn(),
            saveSummary: jest.fn(),
        } as any;

        useCase = new GenerateMovieSummaryUseCase(aiService, dbService);
    });

    it("should save the summary in db", async () => {
        dbService.getRatingsByMovieId.mockResolvedValue(ratings);
        aiService.sendRequest.mockResolvedValue("Summary");

        await useCase.execute("movie-1");

        expect(dbService.saveSummary).toHaveBeenCalledWith({
            movieId: "movie-1",
            content: "Summary",
        });
    });

    it("should throw if there is not enough ratings", async () => {
        dbService.getRatingsByMovieId.mockResolvedValue([]);
        await expect(useCase.execute("movie-1")).rejects.toThrow(
            "Not enough ratings (min.1)"
        );
    });
});
