import { RateLimitData } from "discord.js";
import { Logger } from "tslog";
const log = new Logger();

export default async function onRateLimit(info: RateLimitData) {
  log.warn(`${info.url} ratelimited. retrying in ${info.timeToReset}`);
}
