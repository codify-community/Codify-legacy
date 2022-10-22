import { Logger } from "tslog";
import { jobShared } from ".";
import Cache from "lru-ttl-cache";

const cache = new Cache({
  ttl: "15m",
  ttlInterval: "60s",
  maxBytes: "100mb",
});

export default async function googleSearch(query: string) {
  const googleQuery = encodeURIComponent(query);
  const logger = new Logger({ name: `Google search: '${query}'` });

  while (!jobShared.browser);

  const page = await jobShared.browser.newPage();
  let screenshot;

  try {
    if (!cache.get(googleQuery)) {
      logger.debug(`Going to the search....`);
      await page.goto(
        `https://www.google.com/search?client=firefox-b-d&q=${googleQuery}`,
      );

      logger.debug(`Enabling safe search`);

      await page.evaluate(() => {
        document
          .querySelector('a[href*="/safesearch"]')
          ?.parentNode?.parentNode?.parentNode?.querySelector("input")
          ?.click();

        const script = document.createElement("script");
        script.textContent = `document.querySelector('a[href*="/safesearch"]')?.parentNode?.parentNode?.parentNode?.querySelector("input")?.click();`;
        (document.head || document.documentElement).appendChild(script);
        script.remove();
      });

      logger.debug(`Saving screenshot...`);

      screenshot = await page.screenshot({
        captureBeyondViewport: false,
        type: "png",
      });
      cache.set(googleQuery, screenshot);
    } else {
      logger.debug("Used cached entry.");
      screenshot = cache.get(googleQuery);
    }
  } finally {
    logger.info(`Done`);
    await page.close();
  }
  return screenshot;
}
