import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RedactResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const blacklist = [
          'password',
          'passwordHash',
          'salt',
          'secretKey',
          'apiKey',
          'verificationCode',
          'creditCard',
          'securityAnswer',
          'twoFactorSecret',
          'privateKey',
        ];

        const redact = (value: any, blacklist: string[]): any => {
          if (value === null || value === undefined) {
            return value;
          }

          // Recursively redact the fields that are arrays
          if (Array.isArray(value)) {
            return value.map((item) => redact(item, blacklist));
          }

          if (value instanceof Date) {
            return value.toISOString();
          }

          if (typeof value === 'object') {
            const obj = { ...value };

            // Remove the fields that are in the blacklist
            blacklist.forEach((key) => delete obj[key]);

            // Remove the fields that start with an underscore
            Object.keys(obj).forEach((key) => {
              if (key.startsWith('_')) {
                delete obj[key];
              }
            });

            // Recursively redact the fields that are objects
            Object.keys(obj).forEach((key) => {
              obj[key] = redact(obj[key], blacklist);
            });

            return obj;
          }

          return value;
        };

        const filtered = redact(data, blacklist);

        return filtered;
      }),
    );
  }
}
