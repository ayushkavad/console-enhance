"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryUtils = void 0;
class MemoryUtils {
    static getMemoryUsage() {
        const used = process.memoryUsage().heapUsed;
        this.lastMemoryUsage = Math.round((used / 1024 / 1024) * 100) / 100;
        return this.lastMemoryUsage;
    }
    static getMemoryDiff() {
        const currentMemory = this.getMemoryUsage();
        const diff = currentMemory - this.lastMemoryUsage;
        return Math.round(diff * 100) / 100;
    }
}
exports.MemoryUtils = MemoryUtils;
MemoryUtils.lastMemoryUsage = 0;
