import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command, Context } from "../..";

export default class Hello extends Command {
  data = new SlashCommandBuilder().setName("hello").setDescription("Olá");

  async execute({
    interaction,
  }: Context<ChatInputCommandInteraction>): Promise<void> {
    interaction.reply("Olá!");
  }
}
