import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Column } from './column.schema';
import { Model } from 'mongoose';
import { ColumnDto, CreateColumnDto } from './dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>,
    private taskService: TaskService,
  ) {}

  async create(createColumnDto: CreateColumnDto): Promise<ColumnDto> {
    const { name, dashboard } = createColumnDto;
    const isColumnExists = await this.columnModel.findOne({ name, dashboard });

    if (!!isColumnExists)
      throw new BadRequestException('error.column.already-exists');

    const column = await this.columnModel.create(createColumnDto);
    return column.toObject();
  }

  async getByDashboardId(dashboardId: string) {
    const columns = await this.columnModel.find({ dashboard: dashboardId });

    return await Promise.all(
      columns.map(async (column) => {
        const tasks = await this.taskService.getByColumnId(column.id);

        return { ...column.toObject(), tasks };
      }),
    );
  }
}
