import { db } from "../core/db";
import { getRottenTomatoesScores } from "../features/ratings/providers/rotten";
import RatingService from "../features/ratings/services/rating.service";
import AIService from "../features/summary/services/ai.service";
import { GenerateMovieSummaryUseCase } from "../features/summary/use-cases/generate-summary";

const args = process.argv.slice(2);

async function main() {
    try {
        console.log("WORKER CLI MODE");
        // console.log("RUNNING ROTTEN TOMATOES GATHERING");
        // const [name, year] = args;
        // if (!name) throw new Error("No name provided");
        // if (!year) throw new Error("No year provided");
        // console.log(`Gathering Rotten Tomatoes scores for ${name} - ${year}`);
        // console.log(await getRottenTomatoesScores(name, +year));
        console.log("RUNNING SUMMARY GENERATION");
        const [movieId] = args;
        if (!movieId) throw new Error("No name provided");
        const ratingService = new RatingService(db);
        const aiService = new AIService();

        const ratings = await ratingService.getRatingsByMovieId(movieId);
        if (ratings.length < 1) throw new Error("Not enough ratings (min.1)");
        const systemPrompt = GenerateMovieSummaryUseCase.getSystemPrompt();
        const userPrompt =
            GenerateMovieSummaryUseCase.generateUserPrompt(ratings);
        console.log(`Generating ai response for ${movieId}`);
        console.log(
            await aiService.sendRequest({
                user: userPrompt,
                system: systemPrompt,
            })
        );
    } catch (e) {
        console.error(e);
    }
}

main();
