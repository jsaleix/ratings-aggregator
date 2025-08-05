import puppeteer from "puppeteer";

export const getRottenTomatoesScores = async (name: string, year: number) => {
    const browser = await puppeteer.launch({
        headless: "shell",
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    try {
        const searchUrl = `https://www.rottentomatoes.com/search?search=${encodeURIComponent(
            name
        )}`;
        await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

        const mediaRowSelector =
            "#search-results search-page-result:nth-child(2) search-page-media-row";
        await page.waitForSelector(mediaRowSelector, { timeout: 10000 });

        const movieUrl = await page.$eval(`${mediaRowSelector} a`, (el) =>
            el.getAttribute("href")
        );

        if (!movieUrl)
            throw new Error(
                "Aucun lien de film trouvé dans le premier résultat"
            );

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
        if (error instanceof Error) console.error("❌ Erreur :", error.message);
    } finally {
        await browser.close();
    }
};
