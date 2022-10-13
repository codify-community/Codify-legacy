import { Client, REST, Routes } from "discord.js";
import { Logger } from "tslog";

import Commands from "./Commands";
import setupHandlersFor from "./Handlers";

export default class Codify {
  rest: REST;
  client: Client;
  id: string;
  token: string;
  guildID: string;
  public commands = Commands;

  logger = new Logger();

  constructor(token: string, id: string, guildID: string) {
    this.rest = new REST({ version: "10" }).setToken(token);
    this.client = new Client({ intents: ["Guilds"] });
    this.token = token;
    this.id = id;
    this.guildID = guildID;
  }

  async prepareCommands() {
    this.logger.debug(
      `Start refreshing ${Commands.length} application (>; /) commands.`
    );

    await this.rest.put(
      Routes.applicationGuildCommands(this.id, this.guildID),
      {
        body: this.commands.map((command) => command.data.toJSON()),
      }
    );
    this.logger.info(
      `Refreshed ${Commands.length} application (>; /) commands.`
    );
  }

  async start() {
    this.logger.info("Starting...");
    await this.prepareCommands();

    this.logger.debug("Loading handlers...");
    setupHandlersFor(this);

    this.logger.debug("Logging into discord...");
    await this.client.login(this.token);
  }
}
