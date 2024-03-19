import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type DashboardDocument = HydratedDocument<Dashboard>;

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
export class Dashboard {
  @Prop({ required: true, type: MongooseSchema.Types.String })
  name: string;
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
