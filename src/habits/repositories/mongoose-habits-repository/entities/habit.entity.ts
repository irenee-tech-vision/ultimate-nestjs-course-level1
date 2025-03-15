import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'habits',
  timestamps: true,
})
export class HabitEntity {
  @Prop({ unique: true, required: true })
  habitId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export const HabitEntitySchema = SchemaFactory.createForClass(HabitEntity);
