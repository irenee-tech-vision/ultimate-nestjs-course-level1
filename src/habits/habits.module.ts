import { Module } from '@nestjs/common';
import { InMemoryDbModule } from '../in-memory-db/in-memory-db.module';
import { HabitsController } from './controllers/habits.controller';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { HabitsService } from './services/habits.service';

@Module({
  imports: [InMemoryDbModule],
  controllers: [HabitsController],
  providers: [HabitsService, InMemoryHabitsRepository],
})
export class HabitsModule {}
