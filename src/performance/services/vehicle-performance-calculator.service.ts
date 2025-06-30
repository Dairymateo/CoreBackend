import { Injectable } from '@nestjs/common';
import { VehicleDocument } from '../../vehicles/schemas/Vehicle.schema'; // Ajusta la ruta si es necesario

@Injectable()
export class VehiclePerformanceCalculatorService {
  /**
   * Calcula el rendimiento del vehículo.
   * Fórmula: RedimientoV = (velocidaP*0.4)+(fiabilidad*0.4)+(1-pesoNormalizado)*0.2
   * Donde velocidadP y pesoNormalizado son normalizados por los máximos de referencia.
   * @param vehicle El documento del vehículo.
   * @returns El rendimiento calculado del vehículo.
   */
  calculateVehiclePerformance(vehicle: VehicleDocument): number {
    const maxPesoReferencia = 800; // Peso máximo registrado
    const maxVelocidadReferencia = 354; // Velocidad punta máxima entre todos los vehículos

    // Normalización de velocidad punta: valor del vehículo / valor máximo de referencia
    const velocidadP = vehicle.velocidadPunta / maxVelocidadReferencia;
    // Normalización de peso: valor del vehículo / valor máximo de referencia.
    // Un peso más bajo contribuye positivamente, por eso 1 - pesoNormalizado.
    const pesoNormalizado = vehicle.peso / maxPesoReferencia;

    // Fiabilidad: se asume que fiabilidad está en porcentaje (0-100),
    // se normaliza a 0-1 y luego se usa (1 - tasaDeFallo) que es la fiabilidad.
    const fiabilidadNormalizada = vehicle.fiabilidad / 100;

    const rendimientoV =
      velocidadP * 0.4 + fiabilidadNormalizada * 0.4 + (1 - pesoNormalizado) * 0.2;

    return parseFloat(rendimientoV.toFixed(4)); // Limitar a 4 decimales
  }
}