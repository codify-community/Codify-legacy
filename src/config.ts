export default class Config {
  public token: string;
  public appId: string;
  public targetGuildId: string;

  constructor() {
    if (process.env.DISCORD_AUTH_TOKEN) {
      this.token = process.env.DISCORD_AUTH_TOKEN || "";
    } else {
      throw new Error(`Missing env var: DISCORD_AUTH_TOKEN`);
    }

    if (process.env.DISCORD_APP_ID) {
      this.appId = process.env.DISCORD_APP_ID;
    } else {
      throw new Error(`Missing env var: DISCORD_APP_ID`);
    }

    if (process.env.DISCORD_GUILD_ID) {
      this.targetGuildId = process.env.DISCORD_GUILD_ID;
    } else {
      throw new Error(`Missing env var: DISCORD_GUILD_ID`);
    }
  }
}
