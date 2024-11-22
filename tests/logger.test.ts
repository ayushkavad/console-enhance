import { log } from "../src";

describe("Enhanced Logger", () => {
  test("should log simple values", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const testValue = "test";
    log(testValue);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test("should log objects", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const testObj = { name: "test" };
    log(testObj);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
