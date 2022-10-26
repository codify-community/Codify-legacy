import { Client, REST, Routes } from "discord.js";
import { onReady } from "./events/ready";
import Config from "../config";
import onInteractionCreate from "./events/interactionCreate";
import commandList from "./commandList";
import { Command } from "../commands";
import { Logger } from "tslog";
import onRateLimit from "./events/rateLimit";

export default class Codify {
  public config: Config;
  public rest: REST;
  public client: Client;
  public commands: Array<Command>;
  logger = new Logger();

  constructor(config: Config) {
    this.config = config;

    this.rest = new REST().setToken(config.token);
    this.client = new Client({ intents: ["Guilds"] });
    this.commands = commandList;
  }

  setupEvents() {
    this.client.on("ready", onReady);
    this.client.on("interactionCreate", (it) => onInteractionCreate(this, it));
    this.client.rest.on("rateLimited", onRateLimit);
  }

  async registerCommands() {
    const commands = this.commands.map((command) => command.data.toJSON());
    this.logger.info(`Registring ${commands.length} commands...`);

    await this.rest.put(
      Routes.applicationGuildCommands(
        this.config.appId,
        this.config.targetGuildId
      ),
      { body: commands }
    );

    this.logger.info(`Registred ${commands.length} commands.`);
  }

  async start() {
    this.setupEvents();
    await this.registerCommands();

    await this.client.login(this.config.token);
  }
}
