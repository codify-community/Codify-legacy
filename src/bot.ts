import { Client, REST } from "discord.js";
import { onReady } from "./client/events/ready";
import Config from "./config";

export default class Bot {
  public config: Config;
  public rest: REST;
  public client: Client;

  constructor(config: Config) {
    this.config = config;

    this.rest = new REST().setToken(config.token);
    this.client = new Client({ intents: ["Guilds"] });
  }

  setupEvents() {
    this.client.on("ready", onReady);
  }

  async start() {
    this.setupEvents();

    await this.client.login(this.config.token);
  }
}
