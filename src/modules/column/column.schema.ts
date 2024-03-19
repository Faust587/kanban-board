import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Dashboard } from '../dashboard/dashboard.schema';

export type ColumnDocument = HydratedDocument<Column>;

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
export class Column {
  @Prop({
    ref: Dashboard.name,
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  dashboard: Dashboard;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.Number, required: true })
  index: number;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
