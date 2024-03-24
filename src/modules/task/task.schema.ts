import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Column } from '../column/column.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: {
    transform: (_, ret) => {
      ret.id = ret._id.toHexString();
      delete ret._id;
    },
  },
})
export class Task {
  @Prop({
    ref: Column.name,
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  column: Column;

  @Prop({ required: true, type: MongooseSchema.Types.String, unique: false })
  name: string;

  @Prop({ required: false, type: MongooseSchema.Types.String })
  description: string;

  @Prop({ required: true, type: MongooseSchema.Types.Number })
  index: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
