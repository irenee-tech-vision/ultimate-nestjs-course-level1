import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';

@Module({
  imports: [
    HabitsModule,
    AnalyticsModule,
    InMemoryDbModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (config: AppConfigService) => {
        return config.seedDataFilePath;
      },
      inject: [AppConfigService],
    }),
    AppConfigModule,
    MongoConnectionModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
