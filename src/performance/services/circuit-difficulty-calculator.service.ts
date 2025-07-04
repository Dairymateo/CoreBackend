import { Injectable } from '@nestjs/common';
import { CircuitDocument } from '../../circuits/schemas/Circuits.schema'; 

@Injectable()
export class CircuitDifficultyCalculatorService {

  calculateCircuitDifficulty(circuit: CircuitDocument): number {
    const {
      cantidadCurvas,
      porcentajeAccidentesHistorico,
      longitudRectaMasLargaKm,
      cambioElevacionMetros,
    } = circuit;

    const pesoCurvas = 0.4;
    const pesoAccidentes = 0.1;
    const pesoRecta = 0.3;
    const pesoElevacion = 0.2;

   
    const curvasNormalizado = cantidadCurvas / 20; 
    const accidentesNormalizado = porcentajeAccidentesHistorico / 100; 
    const rectaNormalizada = 1 - longitudRectaMasLargaKm / 7; 
    const elevacionNormalizada = cambioElevacionMetros / 8; 
    let dificultadCalculada =
      curvasNormalizado * pesoCurvas +
      accidentesNormalizado * pesoAccidentes +
      rectaNormalizada * pesoRecta +
      elevacionNormalizada * pesoElevacion;

    
    dificultadCalculada = Math.min(Math.max(dificultadCalculada * 10, 1), 10);

    return parseFloat(dificultadCalculada.toFixed(2));
  }
}