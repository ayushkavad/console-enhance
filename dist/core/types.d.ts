export interface LogData {
    variableName: string;
    value: any;
    location: string;
    timestamp: string;
    memoryUsage: number;
    type: string;
}
export interface CallerInfo {
    file: string;
    line: number;
    column: number;
}
export interface LogOptions {
    showMemory?: boolean;
    showTime?: boolean;
    showLocation?: boolean;
    color?: boolean;
}
export interface LogFunction {
    (value: any): void;
    trace: (value: any) => void;
    memory: (value: any) => void;
    time: (label: string) => void;
    timeEnd: (label: string) => void;
    configure: (options: LogOptions) => void;
}
