import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteEntity } from '../pacientes/entities/paciente.entity';
import { MedicoEntity } from '../medicos/entities/medico.entity';
import { Repository } from 'typeorm';
import { MedicosService } from '../medicos/medicos.service';
import { PacientesService } from '../pacientes/pacientes.service';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
@Injectable()
export class PacienteMedicoService {

  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,
    private readonly medicosService: MedicosService,
    private readonly pacientesService: PacientesService,
  ){}

  async addMedicoToPaciente(pacienteId: string, medicoId: string) : Promise<PacienteEntity>{
      const pacienteEntity = await this.pacientesService.findOne(pacienteId);
      const medicoEntity: MedicoEntity = await this.medicosService.findOne(medicoId);
      const amountMedicos: MedicoEntity[] = pacienteEntity.medicos;
      if (amountMedicos.length == 5){
        throw new BusinessLogicException(`The patient with id ${pacienteId} has already 5 medics`, BusinessError.PRECONDITION_FAILED)
      }
      pacienteEntity.medicos = [...amountMedicos, medicoEntity];
      return await this.pacienteRepository.save(pacienteEntity);
  }

}
