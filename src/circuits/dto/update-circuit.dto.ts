/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCircuitDto } from './create-circuit.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCircuitDto extends PartialType(CreateCircuitDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  ubication?: string;

  @IsNumber()
  @IsOptional()
  temperature?: number;

  @IsString()
  @IsOptional()
  tipoCircuito?: string;

  @IsNumber()
  @IsOptional()
  cantidadCurvas?: number;

  @IsNumber()
  @IsOptional()
  porcentajeAccidentesHistorico?: number;

  @IsNumber()
  @IsOptional()
  longitudRectaMasLargaKm?: number;

  @IsNumber()
  @IsOptional()
  cambioElevacionMetros?: number;
}
