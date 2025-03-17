import { DynamicModule, Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DbType } from './db-type.enum';
import { HabitsModule } from './habits/habits.module';
import { UsersModule } from './users/users.module';

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
        UsersModule.register({ dbType: appDataDb }),
        CoreModule.forRoot({
          dbTypes,
        }),
      ],
    };
  }
}
