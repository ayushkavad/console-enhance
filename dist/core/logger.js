"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const stack_1 = require("../utils/stack");
const memory_1 = require("../utils/memory");
const formatter_1 = require("../utils/formatter");
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static log(value) {
        const callerInfo = stack_1.StackUtils.getCallerInfo();
        const variableName = stack_1.StackUtils.getVariableName();
        const logData = {
            variableName,
            value,
            location: `${callerInfo.file}:${callerInfo.line}`,
            timestamp: new Date().toISOString(),
            memoryUsage: memory_1.MemoryUtils.getMemoryUsage(),
            type: typeof value,
        };
        console.log(formatter_1.Formatter.format(logData, this.options));
    }
    static trace(value) {
        this.log(value);
        console.trace("Stack trace:");
    }
    static memory(value) {
        const beforeMem = memory_1.MemoryUtils.getMemoryUsage();
        this.log(value);
        const memoryImpact = memory_1.MemoryUtils.getMemoryDiff();
        console.log(chalk_1.default.gray(`Memory impact: ${memoryImpact}MB`));
    }
    static configure(options) {
        this.options = { ...this.options, ...options };
    }
    static time(label) {
        console.time(label);
    }
    static timeEnd(label) {
        console.timeEnd(label);
    }
}
exports.Logger = Logger;
Logger.options = {
    showMemory: true,
    showTime: true,
    showLocation: true,
    color: true,
};
