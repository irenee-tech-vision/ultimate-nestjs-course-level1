import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ValidationError } from '../../exceptions/validation-error';

@Injectable()
export class ValidationErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ValidationError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
