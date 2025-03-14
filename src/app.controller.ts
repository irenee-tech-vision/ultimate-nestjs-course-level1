import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AnalyticsService } from './analytics/analytics.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get()
  getHello(): string {
    this.analyticsService.saveAnalytics({
      message: 'Hello from the AppController',
    });
    return this.appService.getHello();
  }
}
