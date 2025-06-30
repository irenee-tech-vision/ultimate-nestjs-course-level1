import { Expose, Type } from 'class-transformer';

export class UserDto {
  /**
   * Unique identifier for the user.
   *
   * @example 1
   */
  @Expose()
  id: number;

  /**
   * The user's username.
   *
   * @example "johndoe"
   */
  @Expose()
  username: string;

  /**
   * The user's email address.
   *
   * @example "johndoe@example.com"
   */
  @Expose()
  email: string;

  /**
   * The user's first name.
   *
   * @example "John"
   */
  @Expose()
  firstName?: string;

  /**
   * The user's last name.
   *
   * @example "Doe"
   */
  @Expose()
  lastName?: string;

  /**
   * The user's date of birth.
   *
   * @example "1990-01-01T00:00:00.000Z"
   */
  @Expose()
  @Type(() => Date)
  dateOfBirth?: Date;
}
