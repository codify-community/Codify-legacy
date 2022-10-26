import { Client } from "discord.js";
import { Logger } from "tslog";
import updateStatus from "../hooks/updateStatus";

const log = new Logger();

export async function onReady(client: Client) {
  log.info(`Client is ready as ${client.user?.username}`);

  log.debug("Running updateStatus hook");
  updateStatus(client);
}
