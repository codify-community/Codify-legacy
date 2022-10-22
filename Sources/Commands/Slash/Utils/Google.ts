import googleSearch from "@jobs/Google";
import Command, { Context, Interaction } from "@commands/Command";
import { SlashCommandBuilder } from "discord.js";

export default class Google extends Command {
  data = new SlashCommandBuilder()
    .setName("google")
    .setDescription("Pesquisa algo no google")
    .addStringOption(option =>
      option
        .setName("query")
        .setDescription("O quê pesquisar")
        .setRequired(true)
        .setMaxLength(36),
    ) as SlashCommandBuilder;

  async execute({ interaction }: Context<Interaction>): Promise<void> {
    await interaction.deferReply();

    const query = interaction.options.get("query")?.value as string;
    const screenshot = await googleSearch(query);

    await interaction.followUp({ files: [screenshot] });
  }
}
