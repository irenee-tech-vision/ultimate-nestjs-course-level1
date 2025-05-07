import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class AmazingLogger extends ConsoleLogger {
  constructor(private readonly configService: AppConfigService) {
    const maxLogLevel: LogLevel = configService.logLevel || 'debug';
    const allLevels: LogLevel[] = [
      'fatal',
      'error',
      'warn',
      'log',
      'debug',
      'verbose',
    ];

    const currentLevelIndex = allLevels.indexOf(maxLogLevel);
    const maxLogLevelIndex = allLevels.indexOf(maxLogLevel);
    const logLevels = allLevels.slice(currentLevelIndex, maxLogLevelIndex + 1);

    super({
      logLevels,
      json: true,
      colors: true,
    });
  }
}
