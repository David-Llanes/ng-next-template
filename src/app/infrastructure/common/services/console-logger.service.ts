import { Injectable } from '@angular/core';
import { Logger } from '@domain/common/interfaces/logger.abstract';

@Injectable({
  providedIn: 'root',
})
export class ConsoleLoggerService extends Logger {
  log(...args: any[]): void {
    console.log(...args);
  }

  error(...args: any[]): void {
    console.error(...args);
  }

  warn(...args: any[]): void {
    console.warn(...args);
  }
}
