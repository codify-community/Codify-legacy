"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Commands/Command");
async function HandleCommand(codify, interaction) {
    const { commands } = codify;
    if (!interaction.isChatInputCommand())
        return;
    const command = commands.find((command) => command.data.name == interaction.commandName);
    if (command) {
        command.execute(new Command_1.Context(codify, interaction));
    }
}
exports.default = HandleCommand;
//# sourceMappingURL=Command.js.map