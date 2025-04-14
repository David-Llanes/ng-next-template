export abstract class Logger {
  abstract log(...args: any[]): void;
  abstract error(...args: any[]): void;
  abstract warn(...args: any[]): void;
}
