"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Formatter {
    static format(data, options = {}) {
        const { showMemory = true, showTime = true, showLocation = true, color = true, } = options;
        const c = color
            ? chalk_1.default
            : {
                gray: (s) => s,
                cyan: (s) => s,
                yellow: (s) => s,
            };
        let output = "\n";
        // Variable name and type
        output += c.yellow(`${data.variableName}`);
        output += c.gray(` (${data.type})`);
        output += " = ";
        // Value
        output += this.formatValue(data.value, c);
        // Metadata
        const meta = [];
        if (showLocation) {
            meta.push(`📍 ${data.location}`);
        }
        if (showTime) {
            meta.push(`🕒 ${new Date(data.timestamp).toLocaleTimeString()}`);
        }
        if (showMemory) {
            meta.push(`💾 ${data.memoryUsage}MB`);
        }
        if (meta.length > 0) {
            output += "\n" + c.gray(meta.join(" | "));
        }
        return output + "\n";
    }
    static formatValue(value, c) {
        if (value === null)
            return c.cyan("null");
        if (value === undefined)
            return c.cyan("undefined");
        if (typeof value === "object") {
            return c.cyan(JSON.stringify(value, null, 2));
        }
        return c.cyan(String(value));
    }
}
exports.Formatter = Formatter;
