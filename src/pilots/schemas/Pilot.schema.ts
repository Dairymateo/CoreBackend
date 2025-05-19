/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Vehicle } from "src/vehicles/schemas/Vehicle.schema";

export type PilotDocument = HydratedDocument<Pilot>;

@Schema()
export class Pilot{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    equipo: string;
    @Prop({ required: true })
    nacionalidad: string;

    @Prop({required: true})
    promedioPosicionFinalGeneral: number;

    @Prop({required: true})
    porcentajeAbandonoGeneral: number;

    @Prop({})
    vehiculoId: Vehicle;

    @Prop({type: Number})
    generalPerfomance: number;


    
}

export const PilotSchema = SchemaFactory.createForClass(Pilot);