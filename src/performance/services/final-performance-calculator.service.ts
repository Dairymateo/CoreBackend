import { Injectable } from '@nestjs/common';
import { PilotDocument } from '../../pilots/schemas/Pilot.schema'; 
import { CircuitDocument } from '../../circuits/schemas/Circuits.schema'; 
import { ICircuitDifficultyStrategy } from '../interfaces/circuit-difficulty-strategy.interface';
import {
  HighDifficultyCircuitStrategy,
  MediumHighDifficultyCircuitStrategy,
  MediumDifficultyCircuitStrategy,
  LowDifficultyCircuitStrategy,
  DefaultCircuitDifficultyStrategy,
} from '../strategies/circuit-weight-strategies'; 

@Injectable()
export class FinalPerformanceCalculatorService {
  private readonly strategies: ICircuitDifficultyStrategy[];

  constructor(
    private readonly highDifficultyStrategy: HighDifficultyCircuitStrategy,
    private readonly mediumHighDifficultyStrategy: MediumHighDifficultyCircuitStrategy,
    private readonly mediumDifficultyStrategy: MediumDifficultyCircuitStrategy,
    private readonly lowDifficultyStrategy: LowDifficultyCircuitStrategy,
    private readonly defaultDifficultyStrategy: DefaultCircuitDifficultyStrategy,
  ) {
 
    this.strategies = [
      this.highDifficultyStrategy,
      this.mediumHighDifficultyStrategy,
      this.mediumDifficultyStrategy,
      this.lowDifficultyStrategy,
      this.defaultDifficultyStrategy,
    ];
  }


  calculateFinalPerformance(
    pilot: PilotDocument,
    circuit: CircuitDocument,
  ): number {
  
    if (!pilot.vehiculoId || (pilot.vehiculoId as any).vehiclePerfomance === undefined) {
      console.warn(`Vehículo del piloto ${pilot.name} no encontrado o sin rendimiento de vehículo. No se puede calcular el rendimiento final.`);
      return 0;
    }

    const pilotPerformance = pilot.generalPerfomance;
   
    const vehiclePerformance = (pilot.vehiculoId as any).vehiclePerfomance;
    const circuitDifficultyLevel = circuit.dificultadCircuito;

    
    const strategy = this.strategies.find(s => s.appliesTo(circuitDifficultyLevel));

    if (!strategy) {
      
      console.error(`No se encontró una estrategia para el nivel de dificultad: ${circuitDifficultyLevel}`);
      return 0; 
    }

    const { pilotWeight, vehicleWeight } = strategy.getWeights();

    const finalPerformance =
      pilotPerformance * pilotWeight + vehiclePerformance * vehicleWeight;

    return parseFloat(finalPerformance.toFixed(4)); 
  }
}
