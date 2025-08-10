import { db } from "../core/db";
import AIService from "../features/ai/services/ai.service";
import RatingService from "../features/ratings/services/rating.service";

async function main() {
    console.log("WORKER CLI MODE");
    const ratingService = new RatingService(db);
    const ratings = await ratingService.getRatingsByMovieId(
        "f2e73f87-cada-49cb-b5aa-3c451d13b522"
    );
    const newData =
        "{" +
        ratings
            .map(
                (rating) => `'${rating.rating_source}': {
        value: '${rating.value}',
        unit: '${rating.rating_unit}',
    }`
            )
            .join(",\n") +
        "}";
    const aiService = new AIService();
    const res = await aiService.sendRequest({
        system: 'You are a person responsible for writing an observation and an overall summary of the critical reception of a film, based on its ratings from various sources mixing both professional reviews and public opinion, such as RottenTomatoes Audience and Allociné (which is French). If you notice it, you may point out disparities in the film\'s reception depending on nationality. I do not want you to simply give a weather report by listing the ratings; you do not necessarily need to mention the ratings unless they support your point. You will receive a JSON as follows: {"allocine": {"value": "3.4", "unit": "stars"}, "rotten_tomatoes_audience": {"value": "80%", "unit": "percentage"}}. Return only your summary/assessment/observation, with no reply to this prompt or suggestions of what else you could do — just the text and nothing else (this is very important).',
        user: newData,
    });
    console.log(res);
}

main();
