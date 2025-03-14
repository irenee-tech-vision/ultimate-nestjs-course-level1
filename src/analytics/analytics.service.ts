import { Injectable } from '@nestjs/common';
import { InMemoryDbRepository } from '../in-memory-db/in-memory-db.repository';
import { AnalyticsEntity } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(private readonly db: InMemoryDbRepository<AnalyticsEntity>) {}

  saveAnalytics(data: any) {
    this.db.create({
      timestamp: new Date(),
      data,
    });
  }
}
