import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PacienteMedicoService } from './paciente-medico.service';
import { MedicoEntity } from 'src/medicos/entities/medico.entity';
import { PacienteEntity } from 'src/pacientes/entities/paciente.entity';

@Controller('pacientes/:pacienteId/medicos')
export class PacienteMedicoController {
  constructor(private readonly pacienteMedicoService: PacienteMedicoService) {}

  @Post(":medicoId")
  async addMedicoToPaciente(@Param('pacienteId', ParseUUIDPipe) pacienteId: string, @Param('medicoId', ParseUUIDPipe) medicoId: string): Promise<PacienteEntity> {
    return await this.pacienteMedicoService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
