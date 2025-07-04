import { Injectable } from '@nestjs/common';
import { PilotDocument } from '../../pilots/schemas/Pilot.schema'; 

@Injectable()
export class PilotPerformanceCalculatorService {

  calculateGeneralPilotPerformance(pilot: PilotDocument): number {
    if (
      pilot.promedioPosicionFinalGeneral === undefined ||
      pilot.porcentajeAbandonoGeneral === undefined
    ) {
      console.warn('Datos de rendimiento de piloto incompletos, devolviendo 0.');
      return 0;
    }
    const averagePositionFactor = 1 / pilot.promedioPosicionFinalGeneral;
    const reliabilityFactor = 1 - pilot.porcentajeAbandonoGeneral / 100;
    const performance = 0.7 * averagePositionFactor + 0.3 * reliabilityFactor;
    return parseFloat(performance.toFixed(4));
  }
}