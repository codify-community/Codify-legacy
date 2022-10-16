import { Logger } from "tslog";
import Codify from "@codify/Bot";
import { handleContextMenuCommands, handleSlashCommands } from "./Command";

export default function setupHandlersFor(codify: Codify) {
  const logger = new Logger();

  codify.client.on("interactionCreate", interaction => {
    handleSlashCommands(codify, interaction);
    handleContextMenuCommands(codify, interaction);
  });

  codify.client.on("ready", me => {
    logger.info(`${me.user.tag} is ready!`);
  });
}
