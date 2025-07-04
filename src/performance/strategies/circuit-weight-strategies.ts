import { Injectable } from '@nestjs/common';
import { ICircuitDifficultyStrategy } from '../interfaces/circuit-difficulty-strategy.interface';

@Injectable()
export class HighDifficultyCircuitStrategy implements ICircuitDifficultyStrategy {
  appliesTo(difficultyLevel: number): boolean {
    return difficultyLevel === 10;
  }

  getWeights(): { pilotWeight: number; vehicleWeight: number } {
    return { pilotWeight: 0.95, vehicleWeight: 0.05 };
  }
}

@Injectable()
export class MediumHighDifficultyCircuitStrategy implements ICircuitDifficultyStrategy {
  appliesTo(difficultyLevel: number): boolean {
    return difficultyLevel >= 8 && difficultyLevel <= 9;
  }

  getWeights(): { pilotWeight: number; vehicleWeight: number } {
    return { pilotWeight: 0.80, vehicleWeight: 0.20 };
  }
}

@Injectable()
export class MediumDifficultyCircuitStrategy implements ICircuitDifficultyStrategy {
  appliesTo(difficultyLevel: number): boolean {
    return difficultyLevel >= 5 && difficultyLevel <= 7;
  }

  getWeights(): { pilotWeight: number; vehicleWeight: number } {
    return { pilotWeight: 0.6, vehicleWeight: 0.4 };
  }
}

@Injectable()
export class LowDifficultyCircuitStrategy implements ICircuitDifficultyStrategy {
  appliesTo(difficultyLevel: number): boolean {
    return difficultyLevel >= 1 && difficultyLevel <= 4;
  }

  getWeights(): { pilotWeight: number; vehicleWeight: number } {
    return { pilotWeight: 0.2, vehicleWeight: 0.8 };
  }
}

@Injectable()
export class DefaultCircuitDifficultyStrategy implements ICircuitDifficultyStrategy {
  appliesTo(difficultyLevel: number): boolean {
    return true;
  }

  getWeights(): { pilotWeight: number; vehicleWeight: number } {
    return { pilotWeight: 0.5, vehicleWeight: 0.5 };
  }
}
