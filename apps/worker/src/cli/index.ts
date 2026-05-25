import { Command } from "@commander-js/extra-typings";
import {
    addtoQueueCommandHandler,
    imdbCommandHandler,
    ratingsCommandHandler,
} from "./handlers";

const program = new Command();
program.description("Rating Aggregator CLI");

program
    .command("ratings")
    .description("Fetch rating(s) from a provider")
    .argument("movie")
    .argument("provider", "values: allocine | imdb | letterboxd | rotten ")
    .argument("year", "blabla", parseInt)
    .option("--debug", "", false)
    .action(async (name, provider, year, options) => {
        const { debug } = options;
        console.log(await ratingsCommandHandler(name, provider, year, debug));
        return;
    });

program
    .command("imdb")
    .description("Fetch rating(s) from a IMDB using an identifier")
    .argument("imdbId")
    .option("--debug", "", false)
    .action(async (imdbId, options) => {
        const { debug } = options;
        console.log(await imdbCommandHandler(imdbId, debug));
        return;
    });

program
    .command("add")
    .description("Add movie to queue")
    .argument("tmdbId", "Tmdb ID", parseInt)
    .action(async (tmdbId) => {
        await addtoQueueCommandHandler(tmdbId);
        console.log(`Movie ${tmdbId} added to queue!`);
        return;
    });

program.parse();
