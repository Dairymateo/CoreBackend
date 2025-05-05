/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { PilotsController } from './pilots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Pilot, PilotSchema } from './schemas/Pilot.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pilot.name, schema: PilotSchema }])], 
  controllers: [PilotsController],
  providers: [PilotsService],
})
export class PilotsModule {}
