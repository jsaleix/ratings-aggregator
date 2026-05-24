import puppeteer, { Page } from "puppeteer";
import { browserExecutablePath } from "../../../config/scrapping";
import { logger } from "../../../shared/logger";
import { ImdbRatingType, RatingProviderInterface } from "./types";
import { makePuppeterScreenshot as ms } from "./utils";
// import { writeFileSync } from "fs";

const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";
const baseUrl = "https://imdb.com";
const makeScreenshot = async (page: Page) => {
    await ms(page, "imdb");
};

export class IMDBProvider implements RatingProviderInterface<ImdbRatingType> {
    async getRatings(name: string, year: number, debug: boolean = false) {
        const browser = await puppeteer.launch({
            headless: "shell",
            args: ["--no-sandbox"],
            executablePath: browserExecutablePath,
        });
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        try {
            const searchUrl = `https://www.imdb.com/find/?exact=true&s=tt&q=${encodeURIComponent(
                `${name} ${year}`,
            )}`;
            console.log(searchUrl);

            await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
            if (debug) await makeScreenshot(page);

            const selector =
                "#__next > main > div.ipc-page-content-container.ipc-page-content-container--full.sc-83693c0c-0.jgGVpD > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.sc-8c0e77b7-0.fEqeJk > div.sc-8c0e77b7-2.cPxGvJ > ul > li";
            await page.waitForSelector(selector, { timeout: 10000 });

            let movieUrl = await page.evaluate((targetYear: number) => {
                const rows = document.querySelectorAll(
                    "#__next > main > div.ipc-page-content-container.ipc-page-content-container--full.sc-83693c0c-0.jgGVpD > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.sc-8c0e77b7-0.fEqeJk > div.sc-8c0e77b7-2.cPxGvJ > ul > li",
                );

                for (const row of rows) {
                    const anchor = row.querySelector("a");
                    const url = anchor?.getAttribute("href");
                    const year = row
                        .getElementsByTagName("ul")[1]
                        ?.getElementsByTagName("li")[0]?.textContent;

                    if (year && +year === targetYear) return url;
                }

                return null;
            }, year);

            if (!movieUrl) throw new Error("Aucun lien de film trouvé");

            const imdbUrl = `${baseUrl}${movieUrl}`;

            return await this.scrapFromPage(page, imdbUrl, debug);
        } catch (error) {
            logger.error("providers/getIMDBScore error", {
                error,
                name,
            });
            if (error instanceof Error)
                console.error("❌ Erreur :", error.message);
            else console.error(error);
            throw error;
        } finally {
            await browser.close();
        }
    }

    async getRatingsById(
        id: string,
        debug: boolean = false,
    ): Promise<ImdbRatingType> {
        const browser = await puppeteer.launch({
            headless: "shell",
            args: ["--no-sandbox"],
            executablePath: browserExecutablePath,
        });
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        try {
            const imdbUrl = `${baseUrl}/title/${id}`;
            return await this.scrapFromPage(page, imdbUrl, debug);
        } catch (error) {
            logger.error("providers/getIMDBScore error", {
                error,
            });
            if (error instanceof Error)
                console.error("❌ Erreur :", error.message);
            else console.error(error);
            throw error;
        } finally {
            await browser.close();
        }
    }

    private async scrapFromPage(
        page: Page,
        url: string,
        debug: boolean,
    ): Promise<ImdbRatingType> {
        console.log(`🔗 Redirection vers : ${url}`);
        await page.goto(url, {
            timeout: 10000,
        });
        if (debug) await makeScreenshot(page);

        const score = await page.evaluate(() => {
            const ratingDiv = document.querySelector(
                "[data-testid='hero-rating-bar__aggregate-rating__score']",
            );
            const score = ratingDiv?.getElementsByTagName("span")[0];
            return score?.textContent;
        });

        if (!score) throw new Error("No score found");

        return {
            url,
            score,
        };
    }
}
