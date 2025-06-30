
// src/vehicles/vehicles.service.ts
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/Vehicle.schema';
import { VehiclePerformanceCalculatorService } from '../performance/services/vehicle-performance-calculator.service'; // Nueva importación

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    private readonly vehiclePerformanceCalculatorService: VehiclePerformanceCalculatorService, // Inyección de la calculadora
  ) {}

  create(createVehicleDto: CreateVehicleDto): Promise<VehicleDocument> {
    const newVehicle = new this.vehicleModel(createVehicleDto);
    // Usar el servicio de cálculo para el rendimiento del vehículo
    newVehicle.vehiclePerfomance = this.vehiclePerformanceCalculatorService.calculateVehiclePerformance(newVehicle);
    return newVehicle.save();
  }

  findAll(): Promise<VehicleDocument[]> {
    return this.vehicleModel.find().exec();
  }

  findOne(id: string): Promise<VehicleDocument | null> {
    return this.vehicleModel.findById(id).exec();
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
      ).exec();

      if (!updatedVehicleInfo) {
        return null;
      }


      const fullUpdatedVehicle = await this.vehicleModel.findById(id).exec();

      if (fullUpdatedVehicle) {
        // Usar el servicio de cálculo para el rendimiento del vehículo al actualizar
        fullUpdatedVehicle.vehiclePerfomance =
          this.vehiclePerformanceCalculatorService.calculateVehiclePerformance(fullUpdatedVehicle);
        return await fullUpdatedVehicle.save();
      }

      return updatedVehicleInfo;
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
      throw error;
    }
  }

  remove(id: string): Promise<any> {
    return this.vehicleModel.findByIdAndDelete(id).exec();
  }
}
