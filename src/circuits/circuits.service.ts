/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Circuit } from './entities/circuit.entity';
import { Model } from 'mongoose';

@Injectable()
export class CircuitsService {

  constructor(@InjectModel(Circuit.name) private circuitModel: Model<Circuit>) {}


  create(createCircuitDto: CreateCircuitDto) {
    const newCircuit = new this.circuitModel(createCircuitDto);
    return newCircuit.save();
  }

  findAll() {
    return this.circuitModel.find();
  }

  findOne(id: string) {
    return this.circuitModel.findById(id);
  }

  update(id: string, updateCircuitDto: UpdateCircuitDto) {
    return this.circuitModel.findByIdAndUpdate(id, updateCircuitDto);
  }

  remove(id: string) {
    return this.circuitModel.findByIdAndDelete(id);
  }
}
