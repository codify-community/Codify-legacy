import { Logger } from "tslog";

interface CommandName {
  commandName: string;
}

let counter = 0;
const logger = new Logger();

/**
 * Generates a interaction ID for any item that requires a ID.
 * Automatic resets when counter reaches 10000.
 * @param interaction Interaction to generate a ID
 * @returns {string}
 */
export function generateInteractionID<I extends CommandName>(
  interaction: I
): string {
  if (counter >= 10000) {
    counter = 0;
    logger.info(`interactionID counter has been reseted to zero (0)!`);
  }

  logger.silly(`Generated new interactionID: ${counter}`);
  const text = `${interaction.commandName}-${counter}`;
  counter++;

  return text;
}
