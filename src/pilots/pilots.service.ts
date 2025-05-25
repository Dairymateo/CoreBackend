import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pilot, PilotDocument } from './schemas/Pilot.schema';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Circuit, CircuitDocument } from 'src/circuits/schemas/Circuits.schema';

@Injectable()
export class PilotsService {
  constructor(
    @InjectModel(Pilot.name) private pilotModel: Model<Pilot>,
    @InjectModel(Circuit.name) private circuitModel: Model<Circuit>,
    private readonly vehiclesService: VehiclesService,
  ) {}

  async create(createPilotDto: CreatePilotDto) {
    const vehicle = await this.vehiclesService.findOne(
      createPilotDto.vehiculoId,
    );
    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with id "${createPilotDto.vehiculoId}" not found`,
      );
    }
    const newPilot = new this.pilotModel(createPilotDto);
    newPilot.generalPerfomance =
      this.calculateGeneralPilotPerformance(newPilot);
    return newPilot.save();
  }

  findAll() {
    return this.pilotModel.find();
  }

  findOne(id: string) {
    return this.pilotModel.findById(id);
  }

  async update(
    id: string,
    updatePilotDto: UpdatePilotDto,
  ): Promise<PilotDocument | null> {
    try {
      const pilotToUpdate = await this.pilotModel.findById(id);
      if (!pilotToUpdate) {
        return null;
      }

      if (updatePilotDto.vehiculoId) {
        const vehicle = await this.vehiclesService.findOne(
          updatePilotDto.vehiculoId,
        );
        if (!vehicle) {
          throw new NotFoundException(
            `Vehicle with id "${updatePilotDto.vehiculoId}" not found`,
          );
        }
        updatePilotDto.vehiculoId = vehicle._id.toString();
      }

      const updatedPilotInfo = await this.pilotModel
        .findByIdAndUpdate(id, updatePilotDto, { new: true })
        .exec();

      if (updatedPilotInfo) {
        updatedPilotInfo.generalPerfomance =
          this.calculateGeneralPilotPerformance(
            updatedPilotInfo as PilotDocument,
          );
        return await updatedPilotInfo.save();
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

  calculateGeneralPilotPerformance(pilot: PilotDocument): number {
    if (
      pilot.promedioPosicionFinalGeneral === undefined ||
      pilot.porcentajeAbandonoGeneral === undefined
    ) {
      return 0;
    }
    const averagePositionFactor = 1 / pilot.promedioPosicionFinalGeneral;
    const reliabilityFactor = 1 - pilot.porcentajeAbandonoGeneral / 100;
    const performance = 0.7 * averagePositionFactor + 0.3 * reliabilityFactor;
    return performance;
  }

  calculateFinalPerformance(
    pilot: PilotDocument,
    ciruit: CircuitDocument,
  ): number {
    console.log('Pilot vehiculoId:', pilot.vehiculoId);
    console.log('Type of pilot vehiculoId:', typeof pilot.vehiculoId);
    if (!pilot.vehiculoId) {
      return 0;
    }

    const pilotPerformance = pilot.generalPerfomance || 0;
    const vehiclePerformance = (pilot.vehiculoId as any).vehiclePerfomance || 0;
    const NivelDificultad = ciruit.dificultadCircuito || 5;

    let pesoP = 0.5;
    let pesoV = 0.5;

    if (NivelDificultad >= 7 && NivelDificultad <= 10) {
      pesoP = 0.75;
      pesoV = 0.25;
    } else if (NivelDificultad >= 4 && NivelDificultad <= 6) {
      pesoP = 0.6;
      pesoV = 0.4;
    } else if (NivelDificultad >= 1 && NivelDificultad <= 3) {
      pesoP = 0.4;
      pesoV = 0.6;
    } else {
      pesoP = 0.5;
      pesoV = 0.5;
    }

    const finalPerformance =
      pilotPerformance * pesoP + vehiclePerformance * pesoV;

    return finalPerformance;
  }

  async getPilotRankingForCircuit(
    circuitId: string,
  ): Promise<{ pilot: PilotDocument; finalPerformance: number }[]> {
    const circuit = await this.circuitModel.findById(circuitId);
    if (!circuit) {
      throw new Error('Circuit not found');
    }

    const pilots = await this.pilotModel.find().populate('vehiculoId');

    const pilotPerformances = await Promise.all(
      pilots.map(async (pilot) => {
        const finalPerformance = await this.calculateFinalPerformance(
          pilot,
          circuit,
        );
        return { pilot, finalPerformance };
      }),
    );
    pilotPerformances.sort((a, b) => b.finalPerformance - a.finalPerformance);
    return pilotPerformances;
  }
}
