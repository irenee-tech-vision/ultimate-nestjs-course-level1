import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [HabitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
