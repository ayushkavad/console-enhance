import { LogOptions } from "./types";
export declare class Logger {
    private static options;
    static log(value: any): void;
    static trace(value: any): void;
    static memory(value: any): void;
    static configure(options: LogOptions): void;
    static time(label: string): void;
    static timeEnd(label: string): void;
}
