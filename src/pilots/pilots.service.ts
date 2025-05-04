import { Injectable } from '@nestjs/common';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';

@Injectable()
export class PilotsService {
  create(createPilotDto: CreatePilotDto) {
    return 'This action adds a new pilot';
  }

  findAll() {
    return `This action returns all pilots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pilot`;
  }

  update(id: number, updatePilotDto: UpdatePilotDto) {
    return `This action updates a #${id} pilot`;
  }

  remove(id: number) {
    return `This action removes a #${id} pilot`;
  }
}
