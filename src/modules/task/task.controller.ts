import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/index';
import { GetByIdParams } from '../dashboard/dto/index';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Put('/:id')
  async update(
    @Param() { id }: GetByIdParams,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateById(id, updateTaskDto);
  }

  @Delete('/:id')
  async delete(@Param() { id }: GetByIdParams) {
    return this.taskService.deleteById(id);
  }
}
