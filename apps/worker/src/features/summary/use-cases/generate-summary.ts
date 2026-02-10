import { logger } from "../../../shared/logger";

import { ScoreService } from "../../ratings/services/score.service";
import { RatingType } from "../../ratings/types/db";
import { SummaryRepositoryI } from "../interfaces/repositories";
import AIService from "../services/ai.service";

export class GenerateMovieSummaryUseCase {
    constructor(
        private readonly aiService: AIService,
        private readonly summaryRepository: SummaryRepositoryI,
    ) {}

    public static generateUserPrompt(ratings: RatingType[]) {
        return (
            "{" +
            ratings
                .map(
                    (rating) => `'${rating.rating_source}': {
        value: '${rating.value}',
        unit: '${rating.rating_unit}',
    }`,
                )
                .join(",\n") +
            "}"
        );
    }

    public static getSystemPrompt() {
        return `You are a person responsible for writing an observation and an overall summary of the critical reception of a film, based on its ratings from various sources mixing both professional reviews and public opinion, such as RottenTomatoes Audience and Allociné (which is French). If you notice it, you may point out disparities in the film's reception depending on nationality. I do not want you to simply give a weather report by listing the ratings; you do not necessarily need to mention the ratings unless they support your point. You will receive a JSON as follows: {"allocine": {"value": "3.4", "unit": "stars"}, "rotten_tomatoes_audience": {"value": "80%", "unit": "percentage"}}.Return only a JSON object in this format:{"content":"Your concise summary of the reception (MAX. 200 chars).","score":"A letter grade (from A+ to F) based on the ratings."} Do not include anything else in your reply.`;
    }

    async execute(movieId: string) {
        const ratings =
            await this.summaryRepository.getRatingsByMovieId(movieId);
        if (ratings.length < 1) throw new Error("Not enough ratings (min.1)");
        const score = ScoreService.calcScore(ratings).toString();
        const userPrompt =
            GenerateMovieSummaryUseCase.generateUserPrompt(ratings);
        const systemPrompt = GenerateMovieSummaryUseCase.getSystemPrompt();
        const response = await this.aiService
            .sendRequest({
                user: userPrompt,
                system: systemPrompt,
            })
            .catch((error) => {
                logger.error("aiService sendRequest error", {
                    error,
                    movieId: "",
                });
                return undefined;
            });

        return await this.summaryRepository.saveSummary({
            movieId,
            content: response?.content ?? "",
            score,
        });
    }
}
