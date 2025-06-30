import { CircuitDocument } from '../../circuits/schemas/Circuits.schema'; 

export interface ICircuitDifficultyStrategy {

  appliesTo(difficultyLevel: number): boolean;


  getWeights(): { pilotWeight: number; vehicleWeight: number };
}