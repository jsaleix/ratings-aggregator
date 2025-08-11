import { RatingType } from "../../ratings/types/db";
import AIService from "../services/ai.service";
import { DBService } from "../services/db.service";

export class GenerateMovieSummaryUseCase {
    constructor(
        private readonly aiService: AIService,
        private readonly dbService: DBService
    ) {}

    private generateUserPrompt(ratings: RatingType[]) {
        return (
            "{" +
            ratings
                .map(
                    (rating) => `'${rating.rating_source}': {
        value: '${rating.value}',
        unit: '${rating.rating_unit}',
    }`
                )
                .join(",\n") +
            "}"
        );
    }

    private getSystemPrompt() {
        return 'You are a person responsible for writing an observation and an overall summary of the critical reception of a film, based on its ratings from various sources mixing both professional reviews and public opinion, such as RottenTomatoes Audience and Allociné (which is French). If you notice it, you may point out disparities in the film\'s reception depending on nationality. I do not want you to simply give a weather report by listing the ratings; you do not necessarily need to mention the ratings unless they support your point. You will receive a JSON as follows: {"allocine": {"value": "3.4", "unit": "stars"}, "rotten_tomatoes_audience": {"value": "80%", "unit": "percentage"}}. Return only your summary/assessment/observation, with no reply to this prompt or suggestions of what else you could do — just the text and nothing else (this is very important).';
    }

    async execute(movieId: string) {
        const ratings = await this.dbService.getRatingsByMovieId(movieId);
        if (ratings.length < 1) throw new Error("Not enough ratings (min.1)");

        const userPrompt = this.generateUserPrompt(ratings);
        const systemPrompt = this.getSystemPrompt();
        const response = await this.aiService.sendRequest({
            user: userPrompt,
            system: systemPrompt,
        });

        return await this.dbService.saveSummary({ movieId, content: response });
    }
}
