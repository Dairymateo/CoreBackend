/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { AdminGuard } from 'src/auth/guards/admin';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('pilots')
export class PilotsController {
  constructor(private readonly pilotsService: PilotsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createPilotDto: CreatePilotDto) {
    return this.pilotsService.create(createPilotDto);
  }

  @Get()
  findAll() {
    return this.pilotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pilotsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updatePilotDto: UpdatePilotDto) {
    return this.pilotsService.update(id, updatePilotDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.pilotsService.remove(id);
  }


  @Get('general-performance/:id')
  async calculateGeneralPilotPerformance(@Param('id') id: string) {
    const pilot = await this.pilotsService.findOne(id);
    if (!pilot) {
      throw new Error('Pilot not found');
    }
    return this.pilotsService.calculateGeneralPilotPerformance(pilot);
  }
}
