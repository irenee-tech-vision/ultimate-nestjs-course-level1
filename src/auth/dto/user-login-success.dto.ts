import { Expose } from 'class-transformer';

export class UserLoginSuccessDto {
  @Expose()
  accessToken: string;
}
