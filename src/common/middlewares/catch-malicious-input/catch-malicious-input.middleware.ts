import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { hasExceededMaxSize } from './has-exceeded-max-size';
import { hasSuspiciousPatterns } from './has-suspicious-patterns';
import { AppConfigService } from '../../../app-config/app-config.service';

@Injectable()
export class CatchMaliciousInput implements NestMiddleware {
  constructor(private readonly appConfigService: AppConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    if (hasExceededMaxSize(body, this.appConfigService.maxBodySize)) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Request body exceeds size limit',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (hasSuspiciousPatterns(body)) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Invalid input',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    next();
  }
}
