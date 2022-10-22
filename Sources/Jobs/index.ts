import { Browser, launch } from "puppeteer";
import { Logger } from "tslog";

export interface Shared {
  browser?: Browser;
}

export async function launchBrowser(): Promise<Browser> {
  const logger = new Logger();
  logger.info("Launching a browser...");

  return await launch({
    headless: true,
    product: 'firefox',
    defaultViewport: {
      width: 1366,
      height: 728,
    },
  }).then(browser => {
    logger.info("Launched a browser.");
    return browser;
  });
}

export async function setup() {
  jobShared.browser = await launchBrowser();
}

export const jobShared: Shared = {};
