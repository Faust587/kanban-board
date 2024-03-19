import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ColumnModule } from './modules/column/column.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    DashboardModule,
    ColumnModule,
    TaskModule,
  ],
})
export class AppModule {}
