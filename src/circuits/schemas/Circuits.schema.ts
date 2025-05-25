/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CircuitDocument = HydratedDocument<Circuit>;

@Schema()
export class Circuit {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  ubication: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  tipoCircuito: string;

  @Prop({ required: true })
  cantidadCurvas: number;

  @Prop({ required: true })
  porcentajeAccidentesHistorico: number;

  @Prop({ required: true })
  longitudRectaMasLargaKm: number;

  @Prop({ required: true })
  cambioElevacionMetros: number;

  @Prop({ required: true })
  dificultadCircuito: number;
}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);
