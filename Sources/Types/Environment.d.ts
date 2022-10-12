export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /// Discord public client id.
      DISCORD_CLIENT_ID: string;
      /// Guild Snowflake to register slash commands.
      DISCORD_GUILD_ID: string;
      /// Discord authorization token.
      DISCORD_AUTH_TOKEN: string;
    }
  }
}
