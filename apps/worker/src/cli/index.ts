// import { getLetterBoxdScore } from "../features/ratings/providers/letterboxd";

// const args = process.argv.slice(2);

// async function main() {
//     try {
//         console.log("RUNNING LETTERBOXD GATHERING");
//         const [name, year] = args;
//         if (!name) throw new Error("No name provided");
//         if (!year) throw new Error("No year provided");
//         console.log(`Gathering letterboxd score for ${name} - ${year}`);
//         console.log(await getLetterBoxdScore(name, +year));
//     } catch (e) {
//         console.error(e);
//     }
// }

// main();

import { Command } from "@commander-js/extra-typings";
import { ratingsCommandHandler } from "./handlers";

const program = new Command();
program.description("Rating Aggregator CLI");

program
    .command("ratings")
    .description("Fetch rating(s) from a provider")
    .argument("movie")
    .argument("provider", "values: allocine | imdb | letterboxd | rotten ")
    .argument("year", "blabla", parseInt)
    .action((name, provider, year) => {
        ratingsCommandHandler(name, provider, year);
    });

program.parse();
