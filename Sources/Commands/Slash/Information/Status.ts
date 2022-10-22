import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import Command, { Context, Interaction } from "@commands/Command";
import { version as getOSVersion, arch, release, type } from "os";
import { version as nodeVersion } from "process";
import { version as discordJSVersion } from "discord.js";
import { getCurrentProjectMetadata } from "@codify/Utils/Package";
import { codeBlock } from "@codify/Utils/Markdown";
import dayjs from "@codify/Utils/Time";

export default class Status extends Command {
  data = new SlashCommandBuilder()
    .setName("status")
    .setDescription("Veja minhas informações!");

  async execute({ interaction }: Context<Interaction>): Promise<void> {
    await interaction.deferReply();
    const meta = await getCurrentProjectMetadata();
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Get source code")
        .setURL(meta.repository)
        .setStyle(ButtonStyle.Link),
    );

    const heapMb = process.memoryUsage().heapTotal / 1024 / 1024;
    const memoryUsage = `${heapMb.toFixed(2)}M`;
    console.log(process.uptime());
    const uptime = dayjs.duration(-process.uptime(), "seconds").humanize(true);

    const embed = new EmbedBuilder().setColor("Random").setDescription(
      codeBlock(
        "properties",
        `
💻Version       : v${meta.version}
💻Node.JS       : ${nodeVersion}
💻Discord.JS    : v${discordJSVersion}
💻Memory.Usage  : ${memoryUsage}
💻System.Type   : ${type()}
💻System.Arch   : ${arch()}
💻System.Release: ${release()}
💻System.Version: ${getOSVersion()}
💻Uptime        : ${uptime}
`,
      ),
    );

    await interaction.followUp({
      embeds: [embed],
      components: [row as ActionRowBuilder<ButtonBuilder>],
    });
  }
}
