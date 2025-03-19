import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { UsersSortByFieldEnum } from './users-sort-by-field.enum';

export class FindAllUsersQueryDto {
  @IsEnum(UsersSortByFieldEnum)
  @IsOptional()
  sortBy?: UsersSortByFieldEnum;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
