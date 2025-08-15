import { getRottenTomatoesScores } from "../features/ratings/providers/rotten";

const args = process.argv.slice(2);

async function main() {
    try {
        console.log("WORKER CLI MODE");
        console.log("RUNNING ROTTEN TOMATOES GATHERING");
        const [name, year] = args;
        if (!name) throw new Error("No name provided");
        if (!year) throw new Error("No year provided");
        console.log(`Gathering Rotten Tomatoes scores for ${name} ${year}`);
        console.log(await getRottenTomatoesScores(name, +year));
    } catch (e) {
        console.error(e);
    }
}

main();
