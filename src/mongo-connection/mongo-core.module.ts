import { Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';
import { MONGO_CLIENT_TOKEN, MONGO_DB_TOKEN } from './constants';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: MONGO_CLIENT_TOKEN,
      useFactory: (appConfigService: AppConfigService) =>
        new MongoClient(appConfigService.mongoUri),
      inject: [AppConfigService],
    },
    {
      provide: MONGO_DB_TOKEN,
      useFactory: async (mongoClient: MongoClient) => {
        await mongoClient.connect();
        return mongoClient.db();
      },
      inject: [MONGO_CLIENT_TOKEN],
    },
  ],
  exports: [MONGO_DB_TOKEN],
})
export class MongoCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(MONGO_CLIENT_TOKEN)
    private readonly mongoClient: MongoClient,
  ) {}

  onApplicationShutdown(signal?: string) {
    console.log('Closing mongo connection');
    this.mongoClient.close();
  }
}
