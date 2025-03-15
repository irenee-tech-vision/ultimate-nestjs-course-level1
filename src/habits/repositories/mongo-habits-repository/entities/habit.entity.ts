import { ObjectId } from 'mongodb';

export class HabitEntity {
  _id?: ObjectId;
  habitId: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
