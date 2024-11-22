import chalk from "chalk";
import { LogData, LogOptions } from "../core/types";

export class Formatter {
  static format(data: LogData, options: LogOptions = {}): string {
    const {
      showMemory = true,
      showTime = true,
      showLocation = true,
      color = true,
    } = options;

    const c = color
      ? chalk
      : {
          gray: (s: string) => s,
          cyan: (s: string) => s,
          yellow: (s: string) => s,
        };

    let output = "\n";

    // Variable name and type
    output += c.yellow(`${data.variableName}`);
    output += c.gray(` (${data.type})`);
    output += " = ";

    // Value
    output += this.formatValue(data.value, c);

    // Metadata
    const meta: string[] = [];

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

  private static formatValue(value: any, c: any): string {
    if (value === null) return c.cyan("null");
    if (value === undefined) return c.cyan("undefined");

    if (typeof value === "object") {
      return c.cyan(JSON.stringify(value, null, 2));
    }

    return c.cyan(String(value));
  }
}
