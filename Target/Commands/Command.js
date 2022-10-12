"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const tslog_1 = require("tslog");
class Context {
    codify;
    interaction;
    constructor(codify, interaction) {
        this.codify = codify;
        this.interaction = interaction;
    }
}
exports.Context = Context;
class Command {
    logger = new tslog_1.Logger();
}
exports.default = Command;
//# sourceMappingURL=Command.js.map