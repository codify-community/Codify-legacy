import { config } from "dotenv";
import Codify from "./codify";
import Config from "./config";

config();

const bot = new Codify(new Config());

bot.start();
