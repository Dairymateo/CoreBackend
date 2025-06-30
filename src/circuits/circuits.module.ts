/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Circuit } from './entities/circuit.entity';
import { CircuitSchema } from './schemas/Circuits.schema';
import { PerformanceModule } from '../performance/performance.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Circuit.name, schema: CircuitSchema }]),
    PerformanceModule,
  ],
  controllers: [CircuitsController],
  providers: [CircuitsService],
  exports: [MongooseModule, CircuitsService],
})
export class CircuitsModule {}
