import { DynamicModule, Module } from '@nestjs/common';
import { DbType } from '../db-type.enum';
import { InMemoryDbModule } from '../in-memory-db/in-memory-db.module';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';
import { MongoConnectionModule } from '../mongo-connection/mongo-connection.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitEntity } from '../habits/repositories/typeorm-habits-repository/entities/habit.entity';

@Module({})
export class CoreModule {
  static forRoot(options: { dbTypes: DbType[] }): DynamicModule {
    const coreModules = options.dbTypes.map((dbType) => {
      switch (dbType) {
        case DbType.IN_MEMORY:
          return InMemoryDbModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: async (config: AppConfigService) => {
              return config.seedDataFilePath;
            },
            inject: [AppConfigService],
          });
        case DbType.MONGO:
          return MongoConnectionModule.forRoot();
        case DbType.MONGOOSE:
          return MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: (appConfigService: AppConfigService) => {
              return {
                uri: appConfigService.mongoUri,
              };
            },
            inject: [AppConfigService],
          });
        case DbType.TYPE_ORM:
          return TypeOrmModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: (appConfigService: AppConfigService) =>
              appConfigService.ormOptions,
            inject: [AppConfigService],
          });
        default:
          throw new Error(`Unsupported db type: ${dbType}`);
      }
    });

    return {
      module: CoreModule,
      imports: coreModules,
    };
  }
}
