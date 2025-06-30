import { Injectable } from '@nestjs/common';
import { PilotDocument } from '../../pilots/schemas/Pilot.schema'; // Ajusta la ruta
import { CircuitDocument } from '../../circuits/schemas/Circuits.schema'; // Ajusta la ruta
import { ICircuitDifficultyStrategy } from '../interfaces/circuit-difficulty-strategy.interface';
import {
  HighDifficultyCircuitStrategy,
  MediumHighDifficultyCircuitStrategy,
  MediumDifficultyCircuitStrategy,
  LowDifficultyCircuitStrategy,
  DefaultCircuitDifficultyStrategy,
} from '../strategies/circuit-weight-strategies'; // Importa todas las estrategias

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
    // Asegúrate de que las estrategias estén en el orden correcto de precedencia,
    // y la estrategia por defecto al final.
    this.strategies = [
      this.highDifficultyStrategy,
      this.mediumHighDifficultyStrategy,
      this.mediumDifficultyStrategy,
      this.lowDifficultyStrategy,
      this.defaultDifficultyStrategy,
    ];
  }

  /**
   * Calcula el rendimiento final esperado de un piloto en un circuito específico.
   * Utiliza el Patrón Strategy para determinar los pesos del piloto y el vehículo
   * según la dificultad del circuito.
   * @param pilot El documento del piloto.
   * @param circuit El documento del circuito.
   * @returns El rendimiento final calculado.
   */
  calculateFinalPerformance(
    pilot: PilotDocument,
    circuit: CircuitDocument,
  ): number {
    // Validar que vehiculoId exista y tenga vehiclePerfomance.
    // Asumiendo que `populate('vehiculoId')` ya se ha hecho
    // y `pilot.vehiculoId` es un objeto VehicleDocument o un valor null/undefined.
    if (!pilot.vehiculoId || (pilot.vehiculoId as any).vehiclePerfomance === undefined) {
      console.warn(`Vehículo del piloto ${pilot.name} no encontrado o sin rendimiento de vehículo. No se puede calcular el rendimiento final.`);
      return 0;
    }

    const pilotPerformance = pilot.generalPerfomance;
    // Asegúrate de que vehiclePerfomance esté correctamente poblado por Mongoose.
    const vehiclePerformance = (pilot.vehiculoId as any).vehiclePerfomance;
    const circuitDifficultyLevel = circuit.dificultadCircuito;

    // Usar el Patrón Strategy para obtener los pesos
    const strategy = this.strategies.find(s => s.appliesTo(circuitDifficultyLevel));

    if (!strategy) {
      // Esto no debería ocurrir si la DefaultCircuitDifficultyStrategy está bien configurada
      console.error(`No se encontró una estrategia para el nivel de dificultad: ${circuitDifficultyLevel}`);
      return 0; // O manejar el error de otra forma
    }

    const { pilotWeight, vehicleWeight } = strategy.getWeights();

    const finalPerformance =
      pilotPerformance * pilotWeight + vehiclePerformance * vehicleWeight;

    return parseFloat(finalPerformance.toFixed(4)); // Limitar a 4 decimales
  }
}
