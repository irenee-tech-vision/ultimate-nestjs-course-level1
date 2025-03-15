import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '../../../mongo-connection/mongo-connection.module';
import { HabitsRepository } from '../../services/habits.repository';
import { MongoHabitsRepository } from './mongo-habits.repository';

@Module({
  imports: [
    MongoConnectionModule.forFeature({
      collectionName: 'habits',
    }),
  ],
  providers: [
    {
      provide: HabitsRepository,
      useClass: MongoHabitsRepository,
    },
  ],
  exports: [HabitsRepository],
})
export class MongoHabitsRepositoryModule {}
