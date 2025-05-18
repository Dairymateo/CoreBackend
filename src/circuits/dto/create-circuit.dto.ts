/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

/* eslint-disable prettier/prettier */
export class CreateCircuitDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    ubication: string;

    @IsNumber()
    @IsNotEmpty()
    temperature: number;
    
    @IsString()
    @IsNotEmpty()
    tipoCircuito: string;

    @IsNumber()
    @IsNotEmpty()
    NivelDificultad: number;



    


}
