import { Injectable } from '@nestjs/common';
import { VehicleDocument } from '../../vehicles/schemas/Vehicle.schema'; // Ajusta la ruta si es necesario

@Injectable()
export class VehiclePerformanceCalculatorService {

  calculateVehiclePerformance(vehicle: VehicleDocument): number {
    const maxPesoReferencia = 800; 
    const maxVelocidadReferencia = 354; 

  
    const velocidadP = vehicle.velocidadPunta / maxVelocidadReferencia;
  
    const pesoNormalizado = vehicle.peso / maxPesoReferencia;

    
    const fiabilidadNormalizada = vehicle.fiabilidad / 100;

    const rendimientoV =
      velocidadP * 0.4 + fiabilidadNormalizada * 0.4 + (1 - pesoNormalizado) * 0.2;

    return parseFloat(rendimientoV.toFixed(4)); 

  }
} 