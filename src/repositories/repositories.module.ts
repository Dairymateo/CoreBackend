
// src/repositories/repositories.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pilot, PilotSchema } from '../pilots/schemas/Pilot.schema'; // Ajusta la ruta
import { IPilotRepository } from './interfaces/pilot-repository.interface';
import { PilotMongoRepository } from './implementations/pilot-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pilot.name, schema: PilotSchema }]),
  ],
  providers: [
    {
      provide: 'IPilotRepository',
      useClass: PilotMongoRepository, 
    },
  ],
  exports: ['IPilotRepository'], 
})
export class RepositoriesModule {}