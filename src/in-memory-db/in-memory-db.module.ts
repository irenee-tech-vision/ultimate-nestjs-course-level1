import { Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './seed-data.provider';

@Module({
  providers: [InMemoryDbService, SeedDataProvider],
  exports: [InMemoryDbService],
})
export class InMemoryDbModule {}
