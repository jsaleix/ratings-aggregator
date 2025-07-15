import { sleep } from "../../shared/utils";

export async function generateRatingsSummary() {
    console.log(`🟪 Generating Rating summary`);
    await sleep(500);
    console.log("Almost done...");
    await sleep(500);
    console.log("Generation done!");
}
