import { Logger } from "tslog";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";
import Codify from "../Bot";

type CommandType = SlashCommandBuilder | ContextMenuCommandBuilder;
export type Interaction =
  | ChatInputCommandInteraction
  | ContextMenuCommandInteraction;

export class Context<T extends Interaction = Interaction> {
  public codify: Codify;
  public interaction: T;

  constructor(codify: Codify, interaction: T) {
    this.codify = codify;
    this.interaction = interaction;
  }
}

export default abstract class Command<T extends CommandType = CommandType> {
  protected logger = new Logger();
  public abstract data: T;

  abstract execute(context: Context): Promise<void>;
}
