// src/performance/performance.module.ts
import { Module } from '@nestjs/common';
import { PilotPerformanceCalculatorService } from './services/pilot-performance-calculator.service';
import { VehiclePerformanceCalculatorService } from './services/vehicle-performance-calculator.service';
import { CircuitDifficultyCalculatorService } from './services/circuit-difficulty-calculator.service';
import { FinalPerformanceCalculatorService } from './services/final-performance-calculator.service';
import {
  HighDifficultyCircuitStrategy,
  MediumHighDifficultyCircuitStrategy,
  MediumDifficultyCircuitStrategy,
  LowDifficultyCircuitStrategy,
  DefaultCircuitDifficultyStrategy,
} from './strategies/circuit-weight-strategies';

@Module({
  providers: [
    PilotPerformanceCalculatorService,
    VehiclePerformanceCalculatorService,
    CircuitDifficultyCalculatorService,
    FinalPerformanceCalculatorService,
    HighDifficultyCircuitStrategy,
    MediumHighDifficultyCircuitStrategy,
    MediumDifficultyCircuitStrategy,
    LowDifficultyCircuitStrategy,
    DefaultCircuitDifficultyStrategy,
  ],
  exports: [
    PilotPerformanceCalculatorService,
    VehiclePerformanceCalculatorService,
    CircuitDifficultyCalculatorService,
    FinalPerformanceCalculatorService,
  ],
})
export class PerformanceModule {}