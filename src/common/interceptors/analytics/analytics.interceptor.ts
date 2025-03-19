import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { AnalyticsService } from '../../../analytics/analytics.service';

@Injectable()
export class AnalyticsInterceptor implements NestInterceptor {
  constructor(private readonly analyticsService: AnalyticsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const statTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const endTime = Date.now();
        const responseTime = endTime - statTime;

        this.analyticsService.saveAnalytics({
          controller: context.getClass().name,
          handler: context.getHandler().name,
          method: request.method,
          statusCode: response.statusCode,
          responseTime,
        });
      }),
      catchError((error) => {
        const endTime = Date.now();
        const responseTime = endTime - statTime;

        this.analyticsService.saveAnalytics({
          controller: context.getClass().name,
          handler: context.getHandler().name,
          method: request.method,
          statusCode: error.status,
          responseTime,
          error: error.message,
        });

        throw error;
      }),
    );
  }
}
