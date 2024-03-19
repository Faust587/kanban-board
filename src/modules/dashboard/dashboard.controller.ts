import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto, GetByIdParams, UpdateDashboardDto } from './dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/:id')
  async getById(@Param() { id }: GetByIdParams) {
    return this.dashboardService.getById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Put('/:id')
  async update(
    @Param() { id }: GetByIdParams,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.updateById(id, updateDashboardDto);
  }

  @Delete('/:id')
  async delete(@Param() { id }: GetByIdParams) {
    return this.dashboardService.deleteById(id);
  }
}
