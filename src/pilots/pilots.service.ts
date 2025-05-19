/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pilot, PilotDocument } from './schemas/Pilot.schema';

@Injectable()
export class PilotsService {

  constructor(@InjectModel(Pilot.name) private pilotModel: Model<Pilot>) {}


  create(createPilotDto: CreatePilotDto) {
    const newPilot = new this.pilotModel(createPilotDto);
    newPilot.generalPerfomance = this.calculateGeneralPilotPerformance(newPilot);
    return newPilot.save();  
  }

  findAll() {
    return this.pilotModel.find();
  }

  findOne(id: string) {
    return this.pilotModel.findById(id);
  }

  async update(id: string, updatePilotDto: UpdatePilotDto): Promise<PilotDocument | null> {
    try {
      
      const updatedPilotInfo = await this.pilotModel.findByIdAndUpdate(id, updatePilotDto, { new: true });

      if (!updatedPilotInfo) {
        return null;
      }

     
      const fullUpdatedPilot = await this.pilotModel.findById(id);

      if (fullUpdatedPilot) {
        
        fullUpdatedPilot.generalPerfomance = this.calculateGeneralPilotPerformance(fullUpdatedPilot);

        
        return await fullUpdatedPilot.save();
      }

      return updatedPilotInfo; 
    } catch (error) {
      console.error('Error al actualizar el piloto:', error);
      throw error;
    }
  }

  remove(id: string) {
    return this.pilotModel.findByIdAndDelete(id);
  }


  calculateGeneralPilotPerformance(pilot: PilotDocument): number{
    if (pilot.promedioPosicionFinalGeneral === undefined || pilot.porcentajeAbandonoGeneral === undefined) {
      return 0;
    }
    const averagePositionFactor = 1 / pilot.promedioPosicionFinalGeneral;
    const reliabilityFactor = 1 - (pilot.porcentajeAbandonoGeneral / 100);
    const performance = (0.7 * averagePositionFactor) + (0.3 * reliabilityFactor);
    return performance;

  }
}
