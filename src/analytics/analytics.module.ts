import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { InMemoryDbModule } from '../in-memory-db/in-memory-db.module';

@Module({
  imports: [
    InMemoryDbModule.forFeature({
      entityName: 'analytics',
    }),
  ],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
