import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from './column.schema';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
    TaskModule,
  ],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
