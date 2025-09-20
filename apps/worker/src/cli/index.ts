import { getLetterBoxdScore } from "../features/ratings/providers/letterboxd";

const args = process.argv.slice(2);

async function main() {
    try {
        console.log("RUNNING LETTERBOXD GATHERING");
        const [name, year] = args;
        if (!name) throw new Error("No name provided");
        if (!year) throw new Error("No year provided");
        console.log(`Gathering letterboxd score for ${name} - ${year}`);
        console.log(await getLetterBoxdScore(name, +year));
    } catch (e) {
        console.error(e);
    }
}

main();
