import puppeteer, { Page } from "puppeteer";
import { browserExecutablePath } from "../../../config/scrapping";
import { logger } from "../../../shared/logger";
import { LetterboxdRatingType, RatingProviderInterface } from "./types";
import { makePuppeterScreenshot as ms } from "./utils";

const makeScreenshot = async (page: Page) => {
    await ms(page, "letterboxd");
};
const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";

export const getLetterBoxdScore = async (
    name: string,
    year: number,
    debug: boolean = false,
) => {
    const browser = await puppeteer.launch({
        headless: "shell",
        args: ["--no-sandbox"],
        executablePath: browserExecutablePath,
    });
    name = name.toLowerCase();
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);

    try {
        // Step 1 - searching the movie
        const searchUrl = `https://letterboxd.com/search/films/${encodeURIComponent(
            `${name} ${year}`,
        )}`;

        await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

        if (debug) await makeScreenshot(page);

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

        // Step 2 - visiting the movie's page
        const fullMovieUrl = new URL(
            movieUrl,
            "https://letterboxd.com/",
        ).toString();
        console.log(`🔗 Redirection vers : ${fullMovieUrl}`);

        await page.goto(fullMovieUrl, {
            waitUntil: "domcontentloaded",
        });

        if (debug) await makeScreenshot(page);

        // <-- Cookies pop-up
        // await new Promise((r) => setTimeout(r, 3 * 1000));
        // await page.waitForSelector("body > div.fc-consent-root", {
        //     timeout: 10000,
        // });

        // if (debug) await makeScreenshot(page);

        // await page.click(
        //     "body > div.fc-consent-root > div.fc-dialog-container > div.fc-dialog.fc-choice-dialog > div.fc-footer-buttons-container > div.fc-footer-buttons > button.fc-button.fc-cta-do-not-consent.fc-secondary-button",
        // );
        // -->

        await new Promise((r) => setTimeout(r, 3 * 1000));

        const selector =
            "#film-page-wrapper > div.col-17 > aside > section.section.ratings-histogram-chart > div > div > a";
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
    async getRatings(name: string, year: number, debug: boolean) {
        return getLetterBoxdScore(name, year, debug);
    }
}
