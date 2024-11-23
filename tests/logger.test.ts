import { log } from "../src";
import { Logger } from "../src/core/logger";
import { MemoryUtils } from "../src/utils/memory";
import { StackUtils } from "../src/utils/stack";

describe("Enhanced Logger", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    jest.useFakeTimers();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("Basic Logging", () => {
    test("should log simple values", () => {
      const testValue = "test";
      log(testValue);
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy.mock.calls[0][0]).toContain("test");
      expect(consoleSpy.mock.calls[0][0]).toContain("(string)");
    });

    test("should log objects", () => {
      const testObj = { name: "test" };
      log(testObj);
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy.mock.calls[0][0]).toContain('"name": "test"');
      expect(consoleSpy.mock.calls[0][0]).toContain("(object)");
    });

    test("should log null and undefined", () => {
      log(null);
      log(undefined);
      expect(consoleSpy.mock.calls[0][0]).toContain("null");
      expect(consoleSpy.mock.calls[1][0]).toContain("undefined");
    });
  });

  describe("Configuration", () => {
    test("should respect configuration options", () => {
      Logger.configure({
        showMemory: false,
        showTime: false,
        showLocation: false,
        color: false,
      });

      log("test");
      const output = consoleSpy.mock.calls[0][0];

      expect(output).not.toContain("💾");
      expect(output).not.toContain("🕒");
      expect(output).not.toContain("📍");
    });
  });

  describe("Stack Trace", () => {
    test("should show stack trace when using trace", () => {
      const consoletraceSpy = jest.spyOn(console, "trace").mockImplementation();
      Logger.trace("test");

      expect(consoleSpy).toHaveBeenCalled();
      expect(consoletraceSpy).toHaveBeenCalledWith("Stack trace:");

      consoletraceSpy.mockRestore();
    });
  });

  describe("Memory Tracking", () => {
    test("should track memory usage", () => {
      const mockMemoryUsage = jest
        .spyOn(process, "memoryUsage")
        .mockReturnValue({
          heapUsed: 1024 * 1024 * 10, // 10MB
          heapTotal: 0,
          external: 0,
          rss: 0,
          arrayBuffers: 0,
        });

      Logger.memory("test");
      jest.advanceTimersByTime(100);

      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy.mock.calls[1][0]).toContain("Memory impact");

      mockMemoryUsage.mockRestore();
    });
  });

  describe("Time Tracking", () => {
    test("should track execution time", () => {
      const consoleTimeSpy = jest.spyOn(console, "time").mockImplementation();
      const consoleTimeEndSpy = jest
        .spyOn(console, "timeEnd")
        .mockImplementation();

      Logger.time("test-timer");
      Logger.timeEnd("test-timer");

      expect(consoleTimeSpy).toHaveBeenCalledWith("test-timer");
      expect(consoleTimeEndSpy).toHaveBeenCalledWith("test-timer");

      consoleTimeSpy.mockRestore();
      consoleTimeEndSpy.mockRestore();
    });
  });

  describe("Utils", () => {
    describe("StackUtils", () => {
      test("should get caller information", () => {
        const callerInfo = StackUtils.getCallerInfo();
        expect(callerInfo).toHaveProperty("file");
        expect(callerInfo).toHaveProperty("line");
        expect(callerInfo).toHaveProperty("column");
      });

      test("should get variable name", () => {
        const varName = StackUtils.getVariableName();
        expect(typeof varName).toBe("string");
      });
    });

    describe("MemoryUtils", () => {
      test("should track memory differences", () => {
        const mockMemoryUsage = jest
          .spyOn(process, "memoryUsage")
          .mockReturnValue({
            heapUsed: 1024 * 1024 * 10, // 10MB
            heapTotal: 0,
            external: 0,
            rss: 0,
            arrayBuffers: 0,
          });

        MemoryUtils.startMemoryTracking();
        const memoryDiff = MemoryUtils.getMemoryDiff();

        expect(typeof memoryDiff).toBe("number");
        mockMemoryUsage.mockRestore();
      });
    });
  });
});
