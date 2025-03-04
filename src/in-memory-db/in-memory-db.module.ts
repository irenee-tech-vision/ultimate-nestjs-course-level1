import { Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';

@Module({
  providers: [InMemoryDbService],
  exports: [InMemoryDbService]
})
export class InMemoryDbModule {}
