import puppeteer from "puppeteer";
// import { writeFileSync } from "fs";

const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";

export const getAllocineScore = async (name: string, year: number) => {
    const browser = await puppeteer.launch({
        headless: "shell",
        args: ["--no-sandbox"],
    });
    console.log("getAllocineScore")
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    try {
        const searchUrl = `https://www.allocine.fr/rechercher/?q=${encodeURIComponent(
            `${name} ${year}`
        )}`;
        console.log(searchUrl);

        await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("section.movies-results > ul > li", {
            timeout: 10000,
        });

        // const screenshotPath = `./debug-imdb-${Date.now()}.png`;
        // await page.screenshot({
        //     path: screenshotPath as `${string}.png`,
        //     fullPage: true,
        // });
        // console.log(`📸 Screenshot sauvegardé dans : ${screenshotPath}`);

        let scores = await page.evaluate((targetYear: number) => {
            const rows = document.querySelectorAll(
                "section.movies-results > ul > li"
            );

            if (rows.length === 0) return null;

            const shouldBeTheOne = rows[0];

            const vals = shouldBeTheOne.querySelectorAll(".stareval-note");
            const [press, audience] = vals;

            return {
                press: press.textContent??"N/A",
                audience: audience.textContent??"N/A",
            };
        }, year);

        if (!scores) throw new Error("Score not found");
        return scores;
    } catch (error) {
        if (error instanceof Error) console.error("❌ Erreur :", error.message);
        else console.error(error);
        return null
    } finally {
        await browser.close();
    }
};
