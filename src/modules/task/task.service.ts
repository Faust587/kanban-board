import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import {
  ChangeColumnDto,
  ChangeOrderDto,
  CreateTaskDto,
  TaskDto,
  UpdateTaskDto,
} from './dto/';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const { name, columnId, description } = createTaskDto;
    const isTaskExists = await this.taskModel.findOne({
      name,
      column: columnId,
    });

    const tasksAmount = await this.taskModel
      .find({ column: columnId })
      .countDocuments();

    if (isTaskExists)
      throw new BadRequestException('error.task.name-already-exists');
    const task = await this.taskModel.create({
      name,
      description,
      column: columnId,
      index: tasksAmount,
    });

    return task.toObject();
  }

  async getByColumnId(columnId: string): Promise<TaskDto[]> {
    return this.taskModel.find({ column: columnId });
  }

  async updateById(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    const taskForUpdate = await this.taskModel.findById(id);

    if (!taskForUpdate)
      throw new BadRequestException('error.task.not-fount-with-id');

    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });

    return task.toObject();
  }

  async changeTaskOrder(id: string, changeOrderDto: ChangeOrderDto) {
    const { index, columnId } = changeOrderDto;
    const taskForUpdate = await this.taskModel.findById(id);

    const indexForAffectedTask =
      taskForUpdate.index < index ? index - 1 : index + 1;

    const affectedTask = await this.taskModel.findOneAndUpdate(
      {
        column: columnId ?? taskForUpdate.column,
        index,
      },
      { index: indexForAffectedTask },
      { new: true },
    );

    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { index, column: columnId ?? taskForUpdate.column },
      { new: true },
    );

    return {
      updatedTask,
      affectedTask,
    };
  }

  async changeTaskColumn(id: string, changeColumnDto: ChangeColumnDto) {
    const { columnId } = changeColumnDto;
    const taskForUpdate = await this.taskModel.findById(id);

    if (!taskForUpdate)
      throw new BadRequestException('error.task.not-fount-with-id');

    const tasksAmount = await this.taskModel
      .find({ column: columnId })
      .countDocuments();

    return this.taskModel.findByIdAndUpdate(
      id,
      {
        column: columnId,
        index: tasksAmount,
      },
      { new: true },
    );
  }

  async deleteById(id: string): Promise<TaskDto> {
    const dashboard = await this.taskModel.findById(id);

    if (!dashboard)
      throw new BadRequestException('error.task.not-fount-with-id');

    return this.taskModel.findByIdAndDelete(id);
  }
}
