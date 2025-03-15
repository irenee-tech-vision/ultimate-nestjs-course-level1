import { DynamicModule, Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbType } from './db-type.enum';
import { HabitsModule } from './habits/habits.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: {
    appDataDb: DbType;
    appAnalyticsDb: DbType;
  }): DynamicModule {
    const { appDataDb, appAnalyticsDb } = options;
    const dbTypes = Array.from(new Set([appDataDb, appAnalyticsDb]));

    return {
      module: AppModule,
      imports: [
        HabitsModule.register({ dbType: appDataDb }),
        CoreModule.forRoot({
          dbTypes,
        }),
      ],
    };
  }
}
