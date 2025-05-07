import { Injectable, LoggerService } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class AmazingLogger implements LoggerService {
  constructor(private readonly configService: AppConfigService) {}

  private shouldLog(level: string): boolean {
    const levels = ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'];

    const currentLevelIndex = levels.indexOf(this.configService.logLevel);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex <= currentLevelIndex;
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.shouldLog('log')) {
      console.log('LOG:', message, ...optionalParams);
    }
  }

  fatal(message: any, ...optionalParams: any[]) {
    if (this.shouldLog('fatal')) {
      console.error('FATAL:', message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    console.error('ERROR:', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn('WARN:', message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug('DEBUG:', message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log('VERBOSE:', message, ...optionalParams);
  }
}
