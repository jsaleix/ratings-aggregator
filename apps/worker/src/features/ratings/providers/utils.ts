import { Page } from "puppeteer";

export const makePuppeterScreenshot = async (page: Page, provider: string) => {
    const screenshotPath = `./providers-screenshots/debug-${provider}-${Date.now()}.png`;
    await page.screenshot({
        path: screenshotPath as `${string}.png`,
        fullPage: true,
    });
    console.log(`📸 Screenshot sauvegardé dans : ${screenshotPath}`);
};
