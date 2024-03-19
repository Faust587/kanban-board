import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dto/';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const { name, columnId } = createTaskDto;
    console.log(createTaskDto);
    const isTaskExists = await this.taskModel.findOne({
      name,
      column: columnId,
    });

    if (isTaskExists)
      throw new BadRequestException('error.task.name-already-exists');
    console.log(1);
    const task = await this.taskModel.create({ name, column: columnId });
    console.log(2);

    return task.toObject();
  }

  async getByColumnId(columnId: string): Promise<TaskDto[]> {
    return this.taskModel.find({ column: columnId });
  }

  async updateById(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    const isTaskExists = await this.taskModel.findById(id);

    if (!isTaskExists)
      throw new BadRequestException('error.task.not-fount-with-id');

    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });

    return task.toObject();
  }

  async deleteById(id: string): Promise<TaskDto> {
    const dashboard = await this.taskModel.findById(id);

    if (!dashboard)
      throw new BadRequestException('error.task.not-fount-with-id');

    return this.taskModel.findByIdAndDelete(id);
  }
}
