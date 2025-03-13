import { Module } from '@nestjs/common';
import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { InMemoryDbModule } from '../in-memory-db/in-memory-db.module';

@Module({
  imports: [InMemoryDbModule],
  controllers: [HabitsController],
  providers: [HabitsService, InMemoryHabitsRepository],
})
export class HabitsModule {}

