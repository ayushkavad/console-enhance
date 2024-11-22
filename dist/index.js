"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const logger_1 = require("./core/logger");
// Create the main log function
const log = logger_1.Logger.log.bind(logger_1.Logger);
exports.log = log;
// Add additional methods
log.trace = logger_1.Logger.trace.bind(logger_1.Logger);
log.memory = logger_1.Logger.memory.bind(logger_1.Logger);
log.time = logger_1.Logger.time.bind(logger_1.Logger);
log.timeEnd = logger_1.Logger.timeEnd.bind(logger_1.Logger);
log.configure = logger_1.Logger.configure.bind(logger_1.Logger);
