import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dashboard } from './dashboard.schema';
import { Model } from 'mongoose';
import { CreateDashboardDto, UpdateDashboardDto, DashboardDto } from './dto';
import { TaskService } from '../task/task.service';
import { COLUMNS } from '../../enums/columns';
import { ColumnService } from '../column/column.service';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Dashboard.name) private dashboardModel: Model<Dashboard>,
    private taskService: TaskService,
    private columnService: ColumnService,
  ) {}

  async getById(id: string) {
    const dashboard = await this.dashboardModel.findById(id);

    if (!dashboard)
      throw new BadRequestException('error.dashboard.not-fount-with-id');

    const columns = await this.columnService.getByDashboardId(dashboard.id);

    return { ...dashboard.toObject(), columns };
  }

  async create(createDashboardDto: CreateDashboardDto): Promise<DashboardDto> {
    const dashboard = await this.dashboardModel.create(createDashboardDto);

    const columnsName = [
      { name: COLUMNS.TODO, index: 0 },
      { name: COLUMNS.IN_PROGRESS, index: 1 },
      { name: COLUMNS.DONE, index: 2 },
    ];

    const columns = await Promise.all(
      columnsName.map((columnData) => {
        return this.columnService.create({
          ...columnData,
          dashboard: dashboard.id,
        });
      }),
    );

    return {
      ...dashboard.toObject(),
      columns: columns.map((column) => ({ ...column, tasks: [] })),
    };
  }

  async updateById(
    id: string,
    updateDashboardDto: UpdateDashboardDto,
  ): Promise<DashboardDto> {
    const dashboard = await this.dashboardModel.findById(id);

    if (!dashboard)
      throw new BadRequestException('error.dashboard.not-fount-with-id');

    return this.dashboardModel.findByIdAndUpdate(id, updateDashboardDto, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<DashboardDto> {
    const dashboard = await this.dashboardModel.findById(id);

    if (!dashboard)
      throw new BadRequestException('error.dashboard.not-fount-with-id');

    return this.dashboardModel.findByIdAndDelete(id);
  }
}
