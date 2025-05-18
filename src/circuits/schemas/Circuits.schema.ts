/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';


@Schema()
export class Circuit {

    @Prop({unique: true, required: true })
    name: string;
    @Prop({ required: true })
    ubication: string;

    @Prop({ required: true })
    temperature: number;
    
    @Prop({ required: true })
    tipoCircuito: string;
    
    @Prop({ required: true })
    NivelDificultad: number;

}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);