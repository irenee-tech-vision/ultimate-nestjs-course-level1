import { ConsoleLogger, Controller, Get, Logger } from '@nestjs/common';
import { AnalyticsService } from './analytics/analytics.service';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public/is-public.decorator';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name)

  constructor(
    private readonly appService: AppService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @IsPublic()
  @Get()
  getHello(): string {
    this.logger.log('this a message')

    this.analyticsService.saveAnalytics({
      message: 'Hello from the AppController',
    });
    return this.appService.getHello();
  }
}
