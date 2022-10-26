export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_AUTH_TOKEN: string;
      DISCORD_APP_ID: string;
      DISCORD_GUILD_ID: string;
    }
  }
}
