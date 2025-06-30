import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHabitDto {
  @ApiProperty({
    description: 'Name of the habit',
    example: 'Drink water',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the habit',
    example: 'Drink at least 2 liters of water daily',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
