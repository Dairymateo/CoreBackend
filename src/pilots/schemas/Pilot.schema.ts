/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



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


    
}

export const PilotSchema = SchemaFactory.createForClass(Pilot);