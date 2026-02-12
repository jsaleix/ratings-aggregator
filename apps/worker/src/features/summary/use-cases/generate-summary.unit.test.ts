import { ScoreService } from "../../ratings/services/score.service";
import { RatingType } from "../../ratings/types/db";
import { SummaryRepositoryI } from "../interfaces/repositories";
import AIService from "../services/ai.service";
import { GenerateMovieSummaryUseCase } from "./generate-summary";

describe("UseCase GenerateSummary", () => {
    let aiService: jest.Mocked<AIService>;
    let scoreService: jest.Mocked<ScoreService>;
    let summaryRepository: jest.Mocked<SummaryRepositoryI>;
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

        summaryRepository = {
            getRatingsByMovieId: jest.fn(),
            saveSummary: jest.fn(),
        } as any;

        scoreService = {
            calcScore: jest.fn(),
            getScore: jest.fn(),
        } as any;

        useCase = new GenerateMovieSummaryUseCase(
            aiService,
            summaryRepository,
            scoreService,
        );
    });

    it("should save the summary in db", async () => {
        summaryRepository.getRatingsByMovieId.mockResolvedValue(ratings);
        aiService.sendRequest.mockResolvedValue({
            content: "Summary",
            score: "A",
        });
        scoreService.calcScore.mockReturnValue(100);

        await useCase.execute("movie-1");

        expect(summaryRepository.saveSummary).toHaveBeenCalledWith({
            movieId: "movie-1",
            content: "Summary",
            scoreValue: 100,
        });
    });

    it("should throw if there is not enough ratings", async () => {
        summaryRepository.getRatingsByMovieId.mockResolvedValue([]);
        await expect(useCase.execute("movie-1")).rejects.toThrow(
            "Not enough ratings (min.1)",
        );
    });
});
