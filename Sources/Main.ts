import Codify from "./Bot";
import { config } from "dotenv";

config();

const codify = new Codify(
  process.env.DISCORD_AUTH_TOKEN,
  process.env.DISCORD_CLIENT_ID,
  process.env.DISCORD_GUILD_ID
);

codify.start();
