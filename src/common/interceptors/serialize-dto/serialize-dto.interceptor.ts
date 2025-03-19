import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeDtoInterceptor implements NestInterceptor {
  constructor(private readonly classType: new (...args: any[]) => any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.classType, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
