import { LogData, LogOptions } from "./types";
import { StackUtils } from "../utils/stack";
import { MemoryUtils } from "../utils/memory";
import { Formatter } from "../utils/formatter";
import chalk from "chalk";

export class Logger {
  private static options: LogOptions = {
    showMemory: true,
    showTime: true,
    showLocation: true,
    color: true,
  };

  static log(value: any): void {
    const callerInfo = StackUtils.getCallerInfo();
    const variableName = StackUtils.getVariableName();

    const logData: LogData = {
      variableName,
      value,
      location: `${callerInfo.file}:${callerInfo.line}`,
      timestamp: new Date().toISOString(),
      memoryUsage: MemoryUtils.getMemoryUsage(),
      type: typeof value,
    };

    console.log(Formatter.format(logData, this.options));
  }

  static trace(value: any): void {
    this.log(value);
    console.trace("Stack trace:");
  }

  static memory(value: any): void {
    MemoryUtils.startMemoryTracking();
    this.log(value);

    // Force garbage collection if available (Node.js with --expose-gc flag)
    if (global.gc) {
      global.gc();
    }

    // Small delay to allow memory to settle
    setTimeout(() => {
      const memoryImpact = MemoryUtils.getMemoryDiff();
      console.log(chalk.gray(`Memory impact: ${memoryImpact}MB`));
    }, 100);
  }

  static configure(options: LogOptions): void {
    this.options = { ...this.options, ...options };
  }

  static time(label: string): void {
    console.time(label);
  }

  static timeEnd(label: string): void {
    console.timeEnd(label);
  }
}
