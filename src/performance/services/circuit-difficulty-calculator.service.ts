import { Injectable } from '@nestjs/common';
import { CircuitDocument } from '../../circuits/schemas/Circuits.schema'; // Ajusta la ruta si es necesario

@Injectable()
export class CircuitDifficultyCalculatorService {
  /**
   * Calcula la dificultad de un circuito basándose en sus características.
   * @param circuit El documento del circuito.
   * @returns La dificultad calculada del circuito (entre 1 y 10).
   */
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

    // Normalización de los factores
    const curvasNormalizado = cantidadCurvas / 20; // Asumiendo un máximo de 20 curvas para normalizar
    const accidentesNormalizado = porcentajeAccidentesHistorico / 100; // Porcentaje ya entre 0-100
    const rectaNormalizada = 1 - longitudRectaMasLargaKm / 7; // Asumiendo una recta máxima de 7 km, 1 - para que más corta sea más difícil
    const elevacionNormalizada = cambioElevacionMetros / 8; // Asumiendo un cambio de elevación máxima de 8 metros

    let dificultadCalculada =
      curvasNormalizado * pesoCurvas +
      accidentesNormalizado * pesoAccidentes +
      rectaNormalizada * pesoRecta +
      elevacionNormalizada * pesoElevacion;

    // Escalar al rango de 1 a 10 y asegurar que esté dentro de esos límites
    dificultadCalculada = Math.min(Math.max(dificultadCalculada * 10, 1), 10);

    return parseFloat(dificultadCalculada.toFixed(2));
  }
}