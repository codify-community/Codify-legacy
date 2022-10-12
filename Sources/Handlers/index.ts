import { Logger } from "tslog";
import Codify from "../Bot";
import handleCommand from "./Command";

export default function setupHandlersFor(codify: Codify) {
  const logger = new Logger();

  codify.client.on("interactionCreate", (interaction) => {
    handleCommand(codify, interaction);
  });

  codify.client.on("ready", (me) => {
    logger.info(`${me.user.tag} is ready!`);
  });
}
