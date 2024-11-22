import { Logger } from "./core/logger";
import { LogOptions, LogFunction } from "./core/types";

// Create the main log function
const log = Logger.log.bind(Logger) as LogFunction;

// Add additional methods
log.trace = Logger.trace.bind(Logger);
log.memory = Logger.memory.bind(Logger);
log.time = Logger.time.bind(Logger);
log.timeEnd = Logger.timeEnd.bind(Logger);
log.configure = Logger.configure.bind(Logger);

export { log, LogOptions };
