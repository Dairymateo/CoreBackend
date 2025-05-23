/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    cantidadCurvas: number;

    @IsNumber()
    @IsNotEmpty()
    porcentajeAccidentesHistorico: number;

    @IsNumber()
    @IsNotEmpty()
    longitudRectaMasLargaKm: number;

    @IsNumber()
    @IsNotEmpty()
    cambioElevacionMetros: number;
}