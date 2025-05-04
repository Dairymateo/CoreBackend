/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {

    @IsString()
    @IsOptional()
    name?: string;
    @IsString()
    @IsOptional()
    equipo?: string;
    

    @IsNumber()
    @IsOptional()
    velocidadPunta?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(100)
    fiabilidad?: number;

    @IsNumber()
    @IsOptional()
    peso?: number;  
}
