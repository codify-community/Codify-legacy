import { Interaction } from "discord.js";
import { Logger } from "tslog";
import Codify from "../Bot";
import Command, {
  Context,
  Interaction as CommandInteraction,
} from "../Commands/Command";

export async function handleSlashCommands(
  codify: Codify,
  interaction: Interaction
) {
  if (!interaction.isChatInputCommand()) {
    new Logger().debug(`${interaction.id} is not a (/) command.`);
    return;
  }

  doHandle(codify, interaction);
}

export async function handleContextMenuCommands(
  codify: Codify,
  interaction: Interaction
) {
  if (!interaction.isContextMenuCommand()) {
    new Logger().debug(`${interaction.id} is not a (>) command.`);
    return;
  }

  doHandle(codify, interaction);
}

async function doHandle(codify: Codify, interaction: CommandInteraction) {
  const { commands } = codify;
  const logger = new Logger();

  const command = commands.find(
    (command) => command.data.name == interaction.commandName
  );

  if (command) {
    if (interaction.isChatInputCommand()) {
      logger.silly(`Running (/) ${interaction.commandName} command.`);
    }
    if (interaction.isContextMenuCommand()) {
      logger.silly(`Running (>) ${interaction.commandName} command.`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // its safe to do that because we know that only run correct command type.
    command.execute(new Context(codify, interaction as any));
  } else {
    logger.silly(
      `Can't find application command ${interaction.commandName} command. Maybe your fork is out-of-sync?`
    );
  }
}
