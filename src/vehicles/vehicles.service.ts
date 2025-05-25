/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/Vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    const newVehicle = new this.vehicleModel(createVehicleDto);
    newVehicle.vehiclePerfomance = this.CalculateVehiclePerformance(newVehicle);
    return newVehicle.save();
  }

  findAll() {
    return this.vehicleModel.find();
  }

  findOne(id: string) {
    return this.vehicleModel.findById(id);
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleDocument | null> {
    try {
      const updatedVehicleInfo = await this.vehicleModel.findByIdAndUpdate(
        id,
        updateVehicleDto,
        { new: true },
      );

      if (!updatedVehicleInfo) {
        return null;
      }

      const fullUpdatedVehicle = await this.vehicleModel.findById(id);

      if (fullUpdatedVehicle) {
        fullUpdatedVehicle.vehiclePerfomance =
          this.CalculateVehiclePerformance(fullUpdatedVehicle);
        return await fullUpdatedVehicle.save();
      }

      return updatedVehicleInfo;
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
      throw error;
    }
  }

  remove(id: string) {
    return this.vehicleModel.findByIdAndDelete(id);
  }

  CalculateVehiclePerformance(vehicle: VehicleDocument): number {
    const maxPesoReferencia = 800;
    const maxVelocidadReferencia = 354;

    const velocidadP = vehicle.velocidadPunta / maxVelocidadReferencia;
    const pesoNormalizado = vehicle.peso / maxPesoReferencia;

    const fiabilidadNormalizada = vehicle.fiabilidad / 100;
    const tasaDeFallo = 1 - fiabilidadNormalizada;

    const rendimientoV =
      velocidadP * 0.4 + (1 - tasaDeFallo) * 0.4 + (1 - pesoNormalizado) * 0.2;
    return rendimientoV;
  }
}
