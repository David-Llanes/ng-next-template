import { Provider } from '@angular/core';

import { Logger } from '@domain/common/interfaces/logger.abstract';
import { ConsoleLoggerService } from '@infrastructure/common/services/console.logger.service';

export function provideAppDependencies(): Provider[] {
  return [{ provide: Logger, useClass: ConsoleLoggerService }];
}
