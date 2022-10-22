import { Logger } from "tslog";
import { jobShared } from ".";

export default async function googleSearch(query: string) {
  const googleQuery = encodeURIComponent(query);
  const logger = new Logger({ name: `Google search: '${query}'` });

  while (!jobShared.browser);

  const page = await jobShared.browser.newPage();
  let screenshot;

  try {
    logger.debug(`Going to the search....`);
    await page.goto(
      `https://www.google.com/search?client=firefox-b-d&q=${googleQuery}`,
      { waitUntil: "networkidle2" },
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
  } finally {
    logger.info(`Done`);
    await page.close();
  }
  return screenshot;
}
