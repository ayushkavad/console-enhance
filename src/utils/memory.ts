export class MemoryUtils {
  private static lastMemoryUsage: number = 0;

  static getMemoryUsage(): number {
    const used = process.memoryUsage().heapUsed;
    this.lastMemoryUsage = Math.round((used / 1024 / 1024) * 100) / 100;
    return this.lastMemoryUsage;
  }

  static getMemoryDiff(): number {
    const currentMemory = this.getMemoryUsage();
    const diff = currentMemory - this.lastMemoryUsage;
    return Math.round(diff * 100) / 100;
  }
}
