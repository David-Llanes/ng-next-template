import { Provider } from '@angular/core';

import { Logger } from '@domain/common/interfaces/logger.abstract';
import { QueryBuilder } from '@domain/common/interfaces/query-builder.abstract';
import { ConsoleLoggerService } from '@infrastructure/common/services/console-logger.service';
import { DevExtremeQueryBuilder } from '@infrastructure/common/services/devextreme-query-builder.service';

export function provideAppDependencies(): Provider[] {
  return [
    { provide: Logger, useClass: ConsoleLoggerService },
    { provide: QueryBuilder, useClass: DevExtremeQueryBuilder },
  ];
}
