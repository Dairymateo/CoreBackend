// src/circuits/circuits.service.ts
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { Circuit, CircuitDocument } from './schemas/Circuits.schema';
import { CircuitDifficultyCalculatorService } from '../performance/services/circuit-difficulty-calculator.service'; // Nueva importación

@Injectable()
export class CircuitsService {
  constructor(
    @InjectModel(Circuit.name) private circuitModel: Model<CircuitDocument>,
    private readonly circuitDifficultyCalculatorService: CircuitDifficultyCalculatorService, // Inyección de la calculadora
  ) {}

  async create(createCircuitDto: CreateCircuitDto): Promise<Circuit> {
    const newCircuit = new this.circuitModel(createCircuitDto);
    // Usar el servicio de cálculo para la dificultad
    newCircuit.dificultadCircuito = this.circuitDifficultyCalculatorService.calculateCircuitDifficulty(newCircuit);
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

      // Usar el servicio de cálculo para la dificultad al actualizar
      existingCircuit.dificultadCircuito =
        this.circuitDifficultyCalculatorService.calculateCircuitDifficulty(existingCircuit);

      return await existingCircuit.save();
    } catch (error) {
      console.error('Error al actualizar el circuito:', error);
      throw error;
    }
  }

  remove(id: string): Promise<any> {
    return this.circuitModel.findByIdAndDelete(id).exec();
  }
}