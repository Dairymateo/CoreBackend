/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePilotDto } from './create-pilot.dto';
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdatePilotDto extends PartialType(CreatePilotDto) {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    equipo: string;

    @IsString()
    @IsOptional()
    nacionalidad: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(20)
    promedioPosicionFinalGeneral: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(100)
    porcentajeAbandonoGeneral: number;

    @IsOptional()
    @IsMongoId({ })
    vehiculoId?: string;; 
}
