import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HabitsModule,
    AnalyticsModule,
    InMemoryDbModule.forRoot({
      seedDataFilePath: 'fixtures/seed-data.json',
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
