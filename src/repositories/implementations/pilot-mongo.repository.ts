import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pilot, PilotDocument } from '../../pilots/schemas/Pilot.schema'; // Ajusta la ruta
import { IPilotRepository } from '../interfaces/pilot-repository.interface';
import { CreatePilotDto } from '../../pilots/dto/create-pilot.dto';
import { UpdatePilotDto } from '../../pilots/dto/update-pilot.dto';

@Injectable()
export class PilotMongoRepository implements IPilotRepository {
  constructor(
    @InjectModel(Pilot.name) private pilotModel: Model<PilotDocument>,
  ) {}

  async create(pilotData: CreatePilotDto): Promise<PilotDocument> {
    const newPilot = new this.pilotModel(pilotData);
    return newPilot.save();
  }

  async findAll(): Promise<PilotDocument[]> {
    return this.pilotModel.find().exec();
  }

  async findById(id: string): Promise<PilotDocument | null> {
    return this.pilotModel.findById(id).exec();
  }

  async update(id: string, updateData: UpdatePilotDto): Promise<PilotDocument | null> {
    return this.pilotModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.pilotModel.findByIdAndDelete(id).exec();
  }

  async findByVehicleId(vehiculoId: string): Promise<PilotDocument[]> {
    return this.pilotModel.find({ vehiculoId }).exec();
  }

  async save(pilot: PilotDocument): Promise<PilotDocument> {
    return pilot.save();
  }
}
