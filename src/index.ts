import { config } from "dotenv";
import Bot from "./bot";
import Config from "./config";

config();

const bot = new Bot(new Config());

bot.start();
