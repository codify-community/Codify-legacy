import { Interaction } from "discord.js";
import { Logger } from "tslog";
import Codify from "../Bot";
import { Context } from "../Commands/Command";

export default async function HandleCommand(
  codify: Codify,
  interaction: Interaction
) {
  const { commands } = codify;
  const logger = new Logger();

  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    (command) => command.data.name == interaction.commandName
  );

  if (command) {
    logger.silly(`Running (/) ${interaction.commandName} command.`);
    command.execute(new Context(codify, interaction));
  } else {
    logger.silly(
      `Can't find (/) ${interaction.commandName} command. Maybe your fork is out-of-sync?`
    );
  }
}
