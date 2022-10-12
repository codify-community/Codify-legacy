"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../Command"));
class HelloCommand extends Command_1.default {
    data = new discord_js_1.SlashCommandBuilder()
        .setName("hello")
        .setDescription("somente testando");
    async execute({ interaction }) {
        await interaction.reply("Hello!");
    }
}
exports.default = HelloCommand;
//# sourceMappingURL=Hello.js.map