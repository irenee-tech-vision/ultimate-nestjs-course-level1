import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics/analytics.service';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public/is-public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @IsPublic(true)
  @Get()
  getHello(): string {
    this.analyticsService.saveAnalytics({
      message: 'Hello from the AppController',
    });
    return this.appService.getHello();
  }
}
