import { Injectable } from '@nestjs/common';

@Injectable()
export class HabitsService {
  findAll() {
    return [
      {
        id: '1',
        name: 'Habit 1'
      },
      {
        id: '2',
        name: 'Habit 2'
      }
    ]
  }
}
