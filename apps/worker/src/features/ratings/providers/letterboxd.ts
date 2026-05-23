import puppeteer from "puppeteer";
import { browserExecutablePath } from "../../../config/scrapping";
import { logger } from "../../../shared/logger";
import {
    LetterboxdRatingType,
    RatingProviderInterface,
} from "../interfaces/providers";

const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";

export const getLetterBoxdScore = async (name: string, year: number) => {
    const browser = await puppeteer.launch({
        headless: "shell",
        args: ["--no-sandbox"],
        executablePath: browserExecutablePath,
    });
    name = name.toLowerCase();
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);

    try {
        const searchUrl = `https://letterboxd.com/search/films/${encodeURIComponent(
            `${name} ${year}`,
        )}`;

        await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

        // const screenshotPath = `./debug-letterboxd-${Date.now()}.png`;
        // await page.screenshot({
        //     path: screenshotPath as `${string}.png`,
        //     fullPage: true,
        // });
        // console.log(`📸 Screenshot saved in : ${screenshotPath}`);

        const mediaRowSelector = "#search-table-body > ul > li";
        await page.waitForSelector(mediaRowSelector, { timeout: 10000 });

        const movieUrl = await page.evaluate((targetYear) => {
            const rows = Array.from(
                document.querySelectorAll("#search-table-body > ul > li"),
            );

            for (const row of rows) {
                const name = row.querySelector(
                    "article > div.body > h2 > span > a",
                );
                const releaseYear = row.querySelector(
                    "article > div.body > h2 > span > small > a",
                );
                if (
                    name &&
                    releaseYear &&
                    +releaseYear.innerHTML === targetYear
                ) {
                    return name.getAttribute("href");
                }
            }

            return null;
        }, year);

        if (!movieUrl) throw new Error("No movie link found");

        const fullMovieUrl = new URL(
            movieUrl,
            "https://letterboxd.com/",
        ).toString();
        console.log(`🔗 Redirection vers : ${fullMovieUrl}`);

        await page.goto(fullMovieUrl, {
            waitUntil: "domcontentloaded",
        });

        const selector =
            "#film-page-wrapper > div.col-17 > aside > section.section.ratings-histogram-chart > span > a";
        await page.waitForSelector(selector, { timeout: 10000 });

        let score = await page.$eval(
            selector,
            (el) => el.textContent?.trim() || "N/A",
        );

        console.log(`score: ${score}`);
        return {
            name,
            url: fullMovieUrl,
            score,
        };
    } catch (error) {
        logger.error("providers/Letterboxd error", {
            error,
            name,
        });
        if (error instanceof Error) console.error("❌ Erreur :", error.message);
        throw error;
    } finally {
        await browser.close();
    }
};

export class LetterboxdProvider implements RatingProviderInterface<LetterboxdRatingType> {
    async getRatings(name: string, year: number) {
        return getLetterBoxdScore(name, year);
    }
}
