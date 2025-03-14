import { Module } from '@nestjs/common';
import { InMemoryDbModule } from '../in-memory-db/in-memory-db.module';
import { HabitsController } from './controllers/habits.controller';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { HabitsService } from './services/habits.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [
    InMemoryDbModule.forFeature({
      entityName: 'habits',
    }),
    AppConfigModule
  ],
  controllers: [HabitsController],
  providers: [HabitsService, InMemoryHabitsRepository],
})
export class HabitsModule {}
