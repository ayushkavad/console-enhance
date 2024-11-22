import { CallerInfo } from "../core/types";

export class StackUtils {
  static getCallerInfo(): CallerInfo {
    const error = new Error();
    const stackLines = error.stack?.split("\n") || [];
    const callerLine = stackLines[3] || "";

    const matches = callerLine.match(
      /at\s+(?:(.+?)\s+\()?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/
    );

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

  static getVariableName(): string {
    try {
      const error = new Error();
      const stackLines = error.stack?.split("\n") || [];
      const callerLine = stackLines[3] || "";

      const matches = callerLine.match(/\((.*)\)/);
      if (!matches) return "unknown";

      const fileContent = matches[1];
      const logMatch = fileContent.match(/log\((.*)\)/);

      return logMatch ? logMatch[1].trim() : "unknown";
    } catch {
      return "unknown";
    }
  }
}
