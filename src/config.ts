export default class Config {
  public token: string;
  public appId: number;

  constructor() {
    if (process.env.DISCORD_AUTH_TOKEN) {
      this.token = process.env.DISCORD_AUTH_TOKEN || "";
    } else {
      throw new Error(`Missing env var: DISCORD_AUTH_TOKEN`);
    }

    if (process.env.DISCORD_APP_ID) {
      this.appId = Number(process.env.DISCORD_APP_ID) || 0;
    } else {
      throw new Error(`Missing env var: DISCORD_APP_ID`);
    }
  }
}
