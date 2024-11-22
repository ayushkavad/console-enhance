# console-enhance

🚀 A powerful console logging enhancement library for Node.js applications that adds colors, timestamps, and advanced debugging features.

## 📋 Features

- 🎨 Rich colored output for better visibility
- ⏰ Customizable timestamp formats
- 📊 Real-time memory usage monitoring
- ⏱️ High-precision performance timing
- 🔍 Detailed stack trace support
- ⚙️ Flexible configuration options
- 🌈 Multiple log levels with visual distinction
- 🔄 Async operation support

## 🚀 Installation

```bash
npm install console-enhance
# or
yarn add console-enhance
# or
pnpm add console-enhance
```

## 🎯 Quick Start

```typescript
import { log } from "console-enhance";

// Basic logging
log("Hello, World!");
// Output: [2024-03-21 10:30:45] Hello, World!

// Log levels
log.info("Server starting on port 3000");
log.warn("High memory usage detected");
log.error("Database connection failed");
log.success("Deployment completed successfully");
log.debug("Current state:", { users: 100, active: 50 });
```

## 📚 Usage Guide

### ⏱️ Performance Timing

```typescript
// Measure operation duration
log.time("database-query");
await fetchDataFromDB();
log.timeEnd("database-query");
// Output: [10:30:45] database-query: 123ms
```

### 💾 Memory Monitoring

```typescript
// Track memory usage
log.memory();
// Output: [10:30:45] Memory Usage:
//   - Heap: 4.5 MB (40% used)
//   - RSS: 18.2 MB
//   - External: 1.1 MB
```

### 🔍 Debug with Stack Traces

```typescript
// Get detailed error information
log.trace("Authentication failed");
// Output: [10:30:45] Authentication failed
//   at AuthService.validate (/src/auth.ts:45:5)
//   at Router.authenticate (/src/routes.ts:12:3)
```

### ⚙️ Configuration

```typescript
log.configure({
  showTimestamp: true,
  dateFormat: "YYYY-MM-DD HH:mm:ss",
  colors: true,
  logLevel: "info",
  prefix: "MyApp",
  outputFile: "app.log", // Optional file logging
});
```

## 📖 API Reference

### Log Levels

| Method                 | Description      | Use Case                     |
| ---------------------- | ---------------- | ---------------------------- |
| `log(message)`         | Standard logging | General purpose logging      |
| `log.info(message)`    | Information      | Status updates, general info |
| `log.warn(message)`    | Warnings         | Non-critical issues          |
| `log.error(message)`   | Errors           | Critical issues, exceptions  |
| `log.success(message)` | Success          | Completed operations         |
| `log.debug(message)`   | Debug            | Development debugging        |

### Utility Methods

| Method               | Description                 |
| -------------------- | --------------------------- |
| `log.time(label)`    | Start a performance timer   |
| `log.timeEnd(label)` | End timer and show duration |
| `log.memory()`       | Show memory statistics      |
| `log.trace(message)` | Log with stack trace        |
| `log.clear()`        | Clear console output        |

### Configuration Options

```typescript
interface LogOptions {
  showTimestamp?: boolean; // Show/hide timestamps
  dateFormat?: string; // Moment.js format string
  colors?: boolean; // Enable/disable colors
  logLevel?: "debug" | "info" | "warn" | "error"; // Minimum log level
  prefix?: string; // Add prefix to all logs
  outputFile?: string; // File to write logs to
  maxFileSize?: number; // Max log file size in MB
  compress?: boolean; // Compress old log files
}
```

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for details.

## 📄 License

MIT
