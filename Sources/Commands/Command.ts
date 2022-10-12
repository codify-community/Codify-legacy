import { Logger } from "tslog";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import Codify from "../Bot";

export class Context {
  public codify: Codify;
  public interaction: ChatInputCommandInteraction;

  constructor(codify: Codify, interaction: ChatInputCommandInteraction) {
    this.codify = codify;
    this.interaction = interaction;
  }
}

export default abstract class Command {
  protected logger = new Logger();
  public abstract data: SlashCommandBuilder;

  abstract execute(context: Context): Promise<void>;
}
