import { SlashCommandBuilder } from "discord.js";

import Command, { Context } from "../../Command";

export default class HelloCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("somente testando");

  async execute({ interaction }: Context) {
    await interaction.reply("Hello!");
  }
}
