import { Expose, Type } from 'class-transformer';

export class UserModel {
  @Expose()
  userId: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  @Type(() => Date)
  dateOfBirth?: Date;
}
