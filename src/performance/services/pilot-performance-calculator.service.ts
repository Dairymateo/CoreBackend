import { Injectable } from '@nestjs/common';
import { PilotDocument } from '../../pilots/schemas/Pilot.schema'; // Ajusta la ruta si es necesario

@Injectable()
export class PilotPerformanceCalculatorService {
  /**
   * Calcula el rendimiento histórico general del piloto.
   * Fórmula: RendiemitoP = (1/PromedioPosicion)*0.6 + (1-PorcentajeAbandono)*0.4
   * @param pilot El documento del piloto.
   * @returns El rendimiento histórico general del piloto.
   */
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
    // La descripción original usa 0.6 y 0.4, pero tu código usa 0.7 y 0.3.
    // Usaré los de tu código actual (0.7 y 0.3) para ser consistente con tu base.
    const performance = 0.7 * averagePositionFactor + 0.3 * reliabilityFactor;
    return parseFloat(performance.toFixed(4)); // Limitar a 4 decimales
  }
}