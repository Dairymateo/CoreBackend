import { PilotDocument } from '../../pilots/schemas/Pilot.schema'; 
import { CreatePilotDto } from '../../pilots/dto/create-pilot.dto'; 
import { UpdatePilotDto } from '../../pilots/dto/update-pilot.dto'; 


export interface IPilotRepository {
  create(pilotData: CreatePilotDto): Promise<PilotDocument>;
  findAll(): Promise<PilotDocument[]>;
  findById(id: string): Promise<PilotDocument | null>;
  update(id: string, updateData: UpdatePilotDto): Promise<PilotDocument | null>;
  delete(id: string): Promise<any>;
  findByVehicleId(vehiculoId: string): Promise<PilotDocument[]>; 
  save(pilot: PilotDocument): Promise<PilotDocument>; 
}