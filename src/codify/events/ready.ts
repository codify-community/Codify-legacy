import { Client } from "discord.js";
import { Logger } from "tslog";

const log = new Logger();

export async function onReady(client: Client) {
  log.info(`Client is ready as ${client.user?.username}`);
}
