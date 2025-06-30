
// src/pilots/pilots.service.ts
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { Pilot, PilotDocument } from './schemas/Pilot.schema';
import { VehiclesService } from '../vehicles/vehicles.service'; 
import { Circuit, CircuitDocument } from '../circuits/schemas/Circuits.schema'; 
import { PilotPerformanceCalculatorService } from '../performance/services/pilot-performance-calculator.service'; 
import { FinalPerformanceCalculatorService } from '../performance/services/final-performance-calculator.service'; 
import { IPilotRepository } from '../repositories/interfaces/pilot-repository.interface'; // Interfaz del repositorio

@Injectable()
export class PilotsService {
  constructor(
    @Inject('IPilotRepository') private readonly pilotRepository: IPilotRepository, // Inyección del repositorio
    private readonly vehiclesService: VehiclesService,
    private readonly pilotPerformanceCalculatorService: PilotPerformanceCalculatorService, // Inyección de la calculadora de piloto
    private readonly finalPerformanceCalculatorService: FinalPerformanceCalculatorService, // Inyección de la calculadora final
    // Eliminamos @InjectModel(Circuit.name) private circuitModel: Model<Circuit>,
    // ya que su responsabilidad no es manejar circuitos directamente para findById
    // sino que se lo pasará a la calculadora final
  ) {}

  async create(createPilotDto: CreatePilotDto): Promise<PilotDocument> {
    const vehicle = await this.vehiclesService.findOne(
      createPilotDto.vehiculoId,
    );
    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with id "${createPilotDto.vehiculoId}" not found`,
      );
    }
    const newPilot = await this.pilotRepository.create(createPilotDto); // Usar el repositorio
    newPilot.generalPerfomance =
      this.pilotPerformanceCalculatorService.calculateGeneralPilotPerformance(newPilot);
    return this.pilotRepository.save(newPilot); // Guardar con el repositorio
  }

  findAll(): Promise<PilotDocument[]> {
    return this.pilotRepository.findAll(); // Usar el repositorio
  }

  findOne(id: string): Promise<PilotDocument | null> {
    return this.pilotRepository.findById(id); // Usar el repositorio
  }

  async update(
    id: string,
    updatePilotDto: UpdatePilotDto,
  ): Promise<PilotDocument | null> {
    try {
      const pilotToUpdate = await this.pilotRepository.findById(id); // Usar el repositorio
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

      }

      const updatedPilotInfo = await this.pilotRepository.update(id, updatePilotDto); // Usar el repositorio

      if (updatedPilotInfo) {
        // Recalcular rendimiento general si se actualiza
        updatedPilotInfo.generalPerfomance =
          this.pilotPerformanceCalculatorService.calculateGeneralPilotPerformance(
            updatedPilotInfo,
          );
        return await this.pilotRepository.save(updatedPilotInfo); // Guardar con el repositorio
      }

      return updatedPilotInfo;
    } catch (error) {
      console.error('Error al actualizar el piloto:', error);
      throw error;
    }
  }

  remove(id: string): Promise<any> {
    return this.pilotRepository.delete(id); // Usar el repositorio
  }


  async getPilotRankingForCircuit(
    circuitId: string,
  ): Promise<{ pilot: PilotDocument; finalPerformance: number }[]> {

    const circuit = await (this as any).circuitModel.findById(circuitId).exec(); // Acceso al model de Circuit
    if (!circuit) {
      throw new NotFoundException('Circuit not found');
    }


    const pilots = await (this as any).pilotModel.find().populate('vehiculoId').exec(); // Acceso directo al model de Pilot, debería ser via repository.findById().populate()

    const pilotPerformances = await Promise.all(
      pilots.map(async (pilot) => {
        const finalPerformance = this.finalPerformanceCalculatorService.calculateFinalPerformance(
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