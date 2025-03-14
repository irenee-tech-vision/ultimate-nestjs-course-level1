import { Module } from '@nestjs/common';
import { InMemoryHabitsRepository } from './in-memory-habits.repository';
import { InMemoryDbModule } from '../../../in-memory-db/in-memory-db.module';
import { HabitsRepository } from '../../services/habits.repository';

@Module({
  imports: [
    InMemoryDbModule.forFeature({
      entityName: 'habits',
    }),
  ],
  providers: [
    {
      provide: HabitsRepository,
      useClass: InMemoryHabitsRepository,
    },
  ],
  exports: [HabitsRepository],
})
export class InMemoryHabitsRepositoryModule {}
