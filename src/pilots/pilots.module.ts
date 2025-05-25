import { Module } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { PilotsController } from './pilots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pilot, PilotSchema } from './schemas/Pilot.schema';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { CircuitsModule } from 'src/circuits/circuits.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pilot.name, schema: PilotSchema }]),
    VehiclesModule,
    CircuitsModule,
  ],
  controllers: [PilotsController],
  providers: [PilotsService],
})
export class PilotsModule {}
