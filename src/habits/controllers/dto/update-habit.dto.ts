import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHabitDto {
  @ApiProperty({
    description: 'Name of the habit',
    example: 'Drink water',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description of the habit',
    example: 'Drink at least 2 liters of water daily',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
