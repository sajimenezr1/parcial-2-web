import { Controller, Post, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { PacienteMedicoService } from './paciente-medico.service';
import { PacienteEntity } from 'src/pacientes/entities/paciente.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-error/bussines-error.interceptor';

@Controller('pacientes/:pacienteId/medicos')
@UseInterceptors(BusinessErrorsInterceptor)
export class PacienteMedicoController {
  constructor(private readonly pacienteMedicoService: PacienteMedicoService) {}

  @Post(":medicoId")
  async addMedicoToPaciente(@Param('pacienteId', ParseUUIDPipe) pacienteId: string, @Param('medicoId', ParseUUIDPipe) medicoId: string): Promise<PacienteEntity> {
    return await this.pacienteMedicoService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
