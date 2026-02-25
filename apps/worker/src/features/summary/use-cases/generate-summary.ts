import { logger } from "../../../shared/logger";

import { FullRatingType } from "../../ratings/types/db";
import { SummaryRepositoryI } from "../interfaces/repositories";
import { AiServiceI, ScoreServiceI } from "../interfaces/services";

export class GenerateMovieSummaryUseCase {
    constructor(
        private readonly aiService: AiServiceI,
        private readonly summaryRepository: SummaryRepositoryI,
        private readonly scoreService: ScoreServiceI,
    ) {}

    public static generateUserPrompt(ratings: FullRatingType[]) {
        return (
            "{" +
            ratings
                .map(
                    (rating) => `'${rating.Rating_Source?.name}': {
        value: '${rating.value}',
        unit: '${rating.Rating_Source?.rating_unit}',
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
        const score = this.scoreService.calcScore(ratings);
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
            scoreValue: score,
        });
    }
}
