import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'Habit',
  description: 'A habit entity representing a personal habit to track',
})
export class HabitDto {
  @ApiProperty({
    description: 'Unique identifier for the habit',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the habit',
    example: 'Drink water',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the habit',
    example: 'Drink at least 2 liters of water daily',
  })
  description?: string;
}
