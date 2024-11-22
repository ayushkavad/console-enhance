import { LogData, LogOptions } from "../core/types";
export declare class Formatter {
    static format(data: LogData, options?: LogOptions): string;
    private static formatValue;
}
