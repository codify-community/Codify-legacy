import { Interaction } from "discord.js";

import Codify from "@Source/Bot";
import { Context } from "@Commands/Command";

export default async function HandleCommand(
  codify: Codify,
  interaction: Interaction,
) {
  const { commands } = codify;

  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    command => command.data.name == interaction.commandName,
  );

  if (command) {
    command.execute(new Context(codify, interaction));
  }
}
