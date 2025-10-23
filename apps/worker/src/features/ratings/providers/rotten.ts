import puppeteer from "puppeteer";
import { browserExecutablePath } from "../../../config/scrapping";

export const getRottenTomatoesScores = async (name: string, year: number) => {
    const browser = await puppeteer.launch({
        headless: "shell",
        args: ["--no-sandbox"],
        executablePath: browserExecutablePath,
    });
    const page = await browser.newPage();

    try {
        const searchUrl = `https://www.rottentomatoes.com/search?search=${encodeURIComponent(
            name
        )}`;
        console.log("searchUrl:", searchUrl);
        await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

        const mediaRowSelector =
            "#search-results search-page-result:nth-child(2) search-page-media-row";
        await page.waitForSelector(mediaRowSelector, { timeout: 10000 });

        const movieUrl = await page.evaluate((targetYear) => {
            const movieResultSection = document.querySelector(
                "search-page-result[type='movie']"
            );
            if (!movieResultSection) return null;

            const rows = Array.from(
                movieResultSection.querySelectorAll("search-page-media-row")
            );

            for (const row of rows) {
                const releaseYear = row.getAttribute("release-year");
                if (releaseYear === String(targetYear)) {
                    const anchor = row.querySelector("a");
                    return anchor?.getAttribute("href") || null;
                }
            }

            return null;
        }, year);

        if (!movieUrl) throw new Error("Aucun lien de film trouvé");

        const fullMovieUrl = `${movieUrl}`;
        console.log(`🔗 Redirection vers : ${fullMovieUrl}`);

        await page.goto(movieUrl, { waitUntil: "domcontentloaded" });

        const criticsSelector =
            "#modules-wrap > div.media-scorecard.no-border > media-scorecard > rt-text:nth-child(3)";
        const audienceSelector =
            "#modules-wrap > div.media-scorecard.no-border > media-scorecard > rt-text:nth-child(7)";
        await page.waitForSelector(criticsSelector, { timeout: 10000 });

        let criticsRatings = await page.$eval(
            criticsSelector,
            (el) => el.textContent?.trim() || "N/A"
        );
        let audienceRatings = await page.$eval(
            audienceSelector,
            (el) => el.textContent?.trim() || "N/A"
        );

        if (criticsRatings.indexOf("%") == -1) criticsRatings = "N/A";
        if (audienceRatings.indexOf("%") == -1) audienceRatings = "N/A";

        console.log(`Critics Ratings: ${criticsRatings}`);
        console.log(`Audience Ratings: ${audienceRatings}`);
        return {
            name,
            url: fullMovieUrl,
            criticsRatings,
            audienceRatings,
        };
    } catch (error) {
        // logger.error("providers/getRottenTomatoesScores error", {
        //     error,
        //     name,
        // });
        if (error instanceof Error) console.error("❌ Erreur :", error.message);
        throw error;
    } finally {
        await browser.close();
    }
};
