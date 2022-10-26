import {
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import Codify from "../codify";

export interface Context<I> {
  interaction: I;
  codify: Codify;
}

export abstract class Command {
  abstract data: SlashCommandBuilder | ContextMenuCommandBuilder;

  abstract execute(
    context: Context<
      ChatInputCommandInteraction | ContextMenuCommandInteraction
    >
  ): Promise<void>;
}
