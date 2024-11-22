"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackUtils = void 0;
class StackUtils {
    static getCallerInfo() {
        var _a;
        const error = new Error();
        const stackLines = ((_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n")) || [];
        const callerLine = stackLines[3] || "";
        const matches = callerLine.match(/at\s+(?:(.+?)\s+\()?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/);
        if (!matches) {
            return {
                file: "unknown",
                line: 0,
                column: 0,
            };
        }
        return {
            file: (matches[2] || matches[5]).split("/").pop() || "unknown",
            line: parseInt(matches[3] || "0", 10),
            column: parseInt(matches[4] || "0", 10),
        };
    }
    static getVariableName() {
        var _a;
        try {
            const error = new Error();
            const stackLines = ((_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n")) || [];
            const callerLine = stackLines[3] || "";
            const matches = callerLine.match(/\((.*)\)/);
            if (!matches)
                return "unknown";
            const fileContent = matches[1];
            const logMatch = fileContent.match(/log\((.*)\)/);
            return logMatch ? logMatch[1].trim() : "unknown";
        }
        catch (_b) {
            return "unknown";
        }
    }
}
exports.StackUtils = StackUtils;
