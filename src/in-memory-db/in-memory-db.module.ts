import { Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './seed-data.provider';
import { SEED_DATA_PATH_TOKEN } from './constant';

@Module({
  providers: [
    InMemoryDbService,
    SeedDataProvider,
    {
      provide: SEED_DATA_PATH_TOKEN,
      useValue: 'fixtures/seed-data.json',
    },
  ],
  exports: [InMemoryDbService],
})
export class InMemoryDbModule {}
