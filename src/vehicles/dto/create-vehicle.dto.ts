/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateVehicleDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    equipo: string;
    

    @IsNumber()
    @IsNotEmpty()
    velocidadPunta: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(100)
    fiabilidad: number;

    @IsNumber()
    @IsNotEmpty()
    peso: number;   
}
