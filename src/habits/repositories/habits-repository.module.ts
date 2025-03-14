import { Module } from '@nestjs/common';
import { InMemoryHabitsRepositoryModule } from './in-memory-habits-repository/in-memory-habits-repository.module';

@Module({
  imports: [InMemoryHabitsRepositoryModule],
  exports: [InMemoryHabitsRepositoryModule],
})
export class HabitsRepositoryModule {}
