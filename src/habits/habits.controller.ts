import { Controller, Get } from '@nestjs/common';

@Controller('habits')
export class HabitsController {
  @Get()
  findAll() {
    return ['Habits 1', 'Habits 2'];
  }
}
