import { Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './seed-data.provider';
import { PERSIST_DATA_PATH_TOKEN, SEED_DATA_PATH_TOKEN } from './constant';

@Module({
  providers: [
    InMemoryDbService,
    SeedDataProvider,
    {
      provide: SEED_DATA_PATH_TOKEN,
      useValue: 'fixtures/seed-data.json',
    },
    {
      provide: PERSIST_DATA_PATH_TOKEN,
      useExisting: SEED_DATA_PATH_TOKEN
    }
  ],
  exports: [InMemoryDbService],
})
export class InMemoryDbModule {}
