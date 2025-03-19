import { Expose, Type } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  @Type(() => Date)
  dateOfBirth?: Date;
}
