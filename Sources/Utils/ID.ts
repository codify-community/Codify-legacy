import { ChatInputCommandInteraction } from "discord.js";
let counter = 0;

/**
 * Generates a interaction ID for any item that requires a ID.
 * Automatic resets when counter reaches 10000.
 * @param interaction Interaction to generate a ID
 * @returns {string}
 */
export function GenerateInteractionID(
  interaction: ChatInputCommandInteraction
): string {
  if (counter >= 10000) {
    counter = 0;
  }
  const text = `${interaction.commandName}-${counter}`;
  counter++;

  return text;
}
