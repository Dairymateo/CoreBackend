/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PilotDocument = HydratedDocument<Pilot>;

@Schema()
export class Pilot{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    equipo: string;
    @Prop({ required: true })
    nacionalidad: string;

    @Prop({})
    promedioPosicionFinalGeneral: number;

    @Prop({})
    porcentajeAbandonoGeneral: number;

    @Prop({})
    vehiculos: string; 

    @Prop({type: Number})
    generalPerfomance: number;


    
}

export const PilotSchema = SchemaFactory.createForClass(Pilot);