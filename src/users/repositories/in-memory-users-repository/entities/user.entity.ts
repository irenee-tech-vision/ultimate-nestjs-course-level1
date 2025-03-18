export class UserEntity {
  id: string;
  userId: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
}
