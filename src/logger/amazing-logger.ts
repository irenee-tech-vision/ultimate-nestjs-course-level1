import { LoggerService } from '@nestjs/common';

export class AmazingLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log("LOG:", message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error("FATAL:", message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error("ERROR:", message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn("WARN:", message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug("DEBUG:", message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log("VERBOSE:", message, ...optionalParams);
  }
}