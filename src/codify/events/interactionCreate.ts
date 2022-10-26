import { Interaction } from "discord.js";
import { Logger } from "tslog";
import Codify from "..";

export default async function onInteractionCreate(
  codify: Codify,
  interaction: Interaction
) {
  const logger = new Logger();

  if (interaction.isChatInputCommand()) {
    logger.silly(`Trying to run (/) command: ${interaction.commandName}`);
    const command = codify.commands.find(
      (c) => c.data.name == interaction.commandName
    );

    if (command) {
      const before = performance.now();
      await command.execute({ codify, interaction });
      logger.debug(
        `Command (/) ${interaction.commandName} ran in ${
          performance.now() - before
        }ms`
      );
    } else {
      logger.warn(`Command ${interaction.commandName} does not exist!`);
    }
  }
}
