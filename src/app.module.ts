import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ValidationErrorFilter } from './common/filters/validation-error/validation-error.filter';
import { AnalyticsInterceptor } from './common/interceptors/analytics/analytics.interceptor';
import { CoreModule } from './core/core.module';
import { DbType } from './db-type.enum';
import { HabitsModule } from './habits/habits.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AnalyticsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AnalyticsInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
  ],
})
export class AppModule {
  static register(options: {
    appDataDb: DbType;
    appAnalyticsDb: DbType;
  }): DynamicModule {
    const { appDataDb, appAnalyticsDb } = options;
    const dbTypes = Array.from(new Set([appDataDb, appAnalyticsDb]));

    const usersModule = UsersModule.register({ dbType: appDataDb });

    return {
      module: AppModule,
      imports: [
        HabitsModule.register({ dbType: appDataDb }),
        usersModule,
        CoreModule.forRoot({
          dbTypes,
        }),
        AuthModule.withUsersModule(usersModule),
      ],
    };
  }
}
