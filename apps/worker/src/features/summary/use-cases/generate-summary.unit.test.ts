import { FullRatingType } from "../../ratings/types/db";
import { SummaryRepositoryI } from "../interfaces/repositories";
import AIService from "../services/ai.service";
import { ScoreService } from "../services/score.service";
import { GenerateMovieSummaryUseCase } from "./generate-summary";

describe("UseCase GenerateSummary", () => {
    let aiService: jest.Mocked<AIService>;
    let scoreService: jest.Mocked<ScoreService>;
    let summaryRepository: jest.Mocked<SummaryRepositoryI>;
    let useCase: GenerateMovieSummaryUseCase;

    const ratings = [
        {
            id: "r1",
            value: "7",
            source_url: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
            Rating_Source: {
                id: "1",
                rating_unit: "stars",
                code: "Allociné",
                name: "Allociné",
                url: "https://allocine.fr",
                country_code: "FR",
            },
        },
        {
            id: "r2",
            value: "8",
            source_url: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
            Rating_Source: {
                id: "1",
                rating_unit: "stars",
                code: "Allociné_audience",
                name: "Allociné (Audience)",
                url: "https://allocine.fr",
                country_code: "FR",
            },
        },
    ] satisfies FullRatingType[];

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
