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
import {
  ChangeColumnDto,
  ChangeOrderDto,
  CreateTaskDto,
  UpdateTaskDto,
} from './dto';
import { GetByIdParams } from '../dashboard/dto';

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

  @Put('change-order/:id')
  async changeOrder(
    @Param() { id }: GetByIdParams,
    @Body() changeOrderDto: ChangeOrderDto,
  ) {
    return this.taskService.changeTaskOrder(id, changeOrderDto);
  }

  @Put('change-column/:id')
  async changeColumn(
    @Param() { id }: GetByIdParams,
    @Body() changeColumnDto: ChangeColumnDto,
  ) {
    return this.taskService.changeTaskColumn(id, changeColumnDto);
  }

  @Delete('/:id')
  async delete(@Param() { id }: GetByIdParams) {
    return this.taskService.deleteById(id);
  }
}
