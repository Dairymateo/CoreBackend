/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { Circuit, CircuitDocument } from './schemas/Circuits.schema';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectModel(Circuit.name) private circuitModel: Model<CircuitDocument>,
  ) {}

  async create(createCircuitDto: CreateCircuitDto): Promise<Circuit> {
    const newCircuit = new this.circuitModel(createCircuitDto);
    // Calcular la dificultad usando tu nueva lógica y asignarla al nuevo circuito
    newCircuit.dificultadCircuito = this.calculateCircuitDifficulty(newCircuit);
    return newCircuit.save();
  }

  findAll(): Promise<Circuit[]> {
    return this.circuitModel.find().exec();
  }

  findOne(id: string): Promise<Circuit | null> {
    return this.circuitModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCircuitDto: UpdateCircuitDto,
  ): Promise<CircuitDocument | null> {
    try {
      const existingCircuit = await this.circuitModel.findById(id).exec();

      if (!existingCircuit) {
        throw new NotFoundException(`Circuito con ID "${id}" no encontrado.`);
      }

      Object.assign(existingCircuit, updateCircuitDto);

      existingCircuit.dificultadCircuito =
        this.calculateCircuitDifficulty(existingCircuit);

      return await existingCircuit.save();
    } catch (error) {
      console.error('Error al actualizar el circuito:', error);
      throw error;
    }
  }

  remove(id: string): Promise<any> {
    return this.circuitModel.findByIdAndDelete(id).exec();
  }

  private calculateCircuitDifficulty(circuit: CircuitDocument): number {
    const {
      cantidadCurvas,
      porcentajeAccidentesHistorico,
      longitudRectaMasLargaKm,
      cambioElevacionMetros,
    } = circuit;

    const pesoCurvas = 0.4;
    const pesoAccidentes = 0.1;
    const pesoRecta = 0.3;
    const pesoElevacion = 0.2;

    const curvasNormalizado = cantidadCurvas / 20;
    const accidentesNormalizado = porcentajeAccidentesHistorico / 100;
    const rectaNormalizada = 1 - longitudRectaMasLargaKm / 7;
    const elevacionNormalizada = cambioElevacionMetros / 8;

    let dificultadCalculada =
      curvasNormalizado * pesoCurvas +
      accidentesNormalizado * pesoAccidentes +
      rectaNormalizada * pesoRecta +
      elevacionNormalizada * pesoElevacion;

    dificultadCalculada = Math.min(Math.max(dificultadCalculada * 10, 1), 10);

    return parseFloat(dificultadCalculada.toFixed(2));
  }
}
