/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type VehicleDocument = HydratedDocument<Vehicle>;



@Schema()
export class Vehicle {

    @Prop({ required: true })
    equipo: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    velocidadPunta: number;

    @Prop({ required: true })
    fiabilidad: number;

    @Prop({ required: true })
    peso: number; 

    @Prop({ type: Number })
    vehiclePerfomance: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);