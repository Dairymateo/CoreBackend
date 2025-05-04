/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from './entities/vehicle.entity';
import { Model } from 'mongoose';

@Injectable()
export class VehiclesService {

  constructor(@InjectModel(Vehicle.name) private vehicleModel:Model<Vehicle>) {}

  create(createVehicleDto: CreateVehicleDto) {
    const newVehicle = new this.vehicleModel(createVehicleDto);
    return newVehicle.save();
  }

  findAll() {
    return this.vehicleModel.find();
  }

  findOne(id: string) {
    return this.vehicleModel.findById(id);
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleModel.findByIdAndUpdate(id, updateVehicleDto);
  }

  remove(id: string) {
    return this.vehicleModel.findByIdAndDelete(id);
  }
}
