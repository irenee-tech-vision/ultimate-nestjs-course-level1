import { ObjectId } from 'mongodb';

export class UserEntity {
  _id?: ObjectId;
  userId: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}