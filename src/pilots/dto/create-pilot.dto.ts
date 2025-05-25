/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreatePilotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  equipo: string;

  @IsString()
  @IsNotEmpty()
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
  @IsString()
  vehiculoId: string;
}
