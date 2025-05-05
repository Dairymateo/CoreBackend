/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pilot } from './entities/pilot.entity';
import { Model } from 'mongoose';

@Injectable()
export class PilotsService {

  constructor(@InjectModel(Pilot.name) private pilotModel: Model<Pilot>) {}


  create(createPilotDto: CreatePilotDto) {
    const newPilot = new this.pilotModel(createPilotDto);
    return newPilot.save();  
  }

  findAll() {
    return this.pilotModel.find();
  }

  findOne(id: string) {
    return this.pilotModel.findById(id);
  }

  update(id: string, updatePilotDto: UpdatePilotDto) {
    return this.pilotModel.findByIdAndUpdate(id, updatePilotDto);
  }

  remove(id: string) {
    return this.pilotModel.findByIdAndDelete(id);
  }
}
