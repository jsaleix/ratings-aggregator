import puppeteer from "puppeteer";
// import { writeFileSync } from "fs";

const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";
const baseUrl = "https://imdb.com";

export const getIMDBScore = async (name: string, year: number) => {
    const browser = await puppeteer.launch({
        headless: "shell",
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    try {
        const searchUrl = `https://www.imdb.com/find/?exact=true&s=tt&q=${encodeURIComponent(
            `${name} ${year}`
        )}`;
        console.log(searchUrl);

        await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
        await page.waitForSelector(
            "ul.ipc-metadata-list.ipc-metadata-list--dividers-after.ipc-metadata-list--base > li",
            { timeout: 10000 }
        );

        // const screenshotPath = `./debug-imdb-${Date.now()}.png`;
        // await page.screenshot({
        //     path: screenshotPath as `${string}.png`,
        //     fullPage: true,
        // });
        // console.log(`📸 Screenshot sauvegardé dans : ${screenshotPath}`);

        let movieUrl = await page.evaluate((targetYear: number) => {
            const rows = document.querySelectorAll(
                "ul.ipc-metadata-list.ipc-metadata-list--dividers-after.ipc-metadata-list--base > li"
            );

            for (const row of rows) {
                const anchor = row.querySelector("a");
                const url = anchor?.getAttribute("href");
                const year = row
                    .getElementsByTagName("ul")[0]
                    ?.getElementsByTagName("li")[0]
                    ?.querySelector("span")?.textContent;

                if (year && +year === targetYear) return url;
            }

            return null;
        }, year);

        if (!movieUrl)
            throw new Error(
                "Aucun lien de film trouvé dans le premier résultat"
            );

        const fullUrl = `${baseUrl}${movieUrl}`;
        console.log(`🔗 Redirection vers : ${fullUrl}`);

        await page.goto(fullUrl, {
            timeout: 10000,
        });

        const score = await page.evaluate(() => {
            const ratingDiv = document.querySelector(
                "[data-testid='hero-rating-bar__aggregate-rating__score']"
            );
            const score = ratingDiv?.getElementsByTagName("span")[0];
            return score?.textContent;
        });

        return {
            url: fullUrl,
            score,
        };
    } catch (error) {
        if (error instanceof Error) console.error("❌ Erreur :", error.message);
        else console.error(error);
    } finally {
        await browser.close();
    }
};
