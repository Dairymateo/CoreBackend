import { Module } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { PilotsController } from './pilots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pilot, PilotSchema } from './schemas/Pilot.schema';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { CircuitsModule } from 'src/circuits/circuits.module';
import { PerformanceModule } from '../performance/performance.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { Circuit, CircuitSchema } from 'src/circuits/schemas/Circuits.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pilot.name, schema: PilotSchema }, { name: Circuit.name, schema: CircuitSchema }]),
    VehiclesModule,
    CircuitsModule,
    PerformanceModule,
    RepositoriesModule,
  ],
  controllers: [PilotsController],
  providers: [PilotsService],
  exports: [PilotsService],
})
export class PilotsModule {}
