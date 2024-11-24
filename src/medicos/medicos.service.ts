import { Injectable } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoEntity } from './entities/medico.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException} from "../shared/business-errors"

@Injectable()
export class MedicosService {

  constructor(
    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>
  ){}

  async create(createMedicoDto: CreateMedicoDto){
    const {nombre, especialidad, telefono} = createMedicoDto;
    if (!nombre || !especialidad ){
        throw new BusinessLogicException('nombre or especialidad must have a valid value', BusinessError.PRECONDITION_FAILED)
    }
    return await this.medicoRepository.save({nombre, especialidad, telefono})
  }

  async findAll() {
    return await this.medicoRepository.find();
  }


  async findOne(id: string) : Promise<MedicoEntity> {
    const medico:MedicoEntity = await this.medicoRepository.findOne({where: {id}, relations: ["pacientes"]});
    if (!medico){
        throw new BusinessLogicException(`The doctor with id ${id} doesn't exists`, BusinessError.NOT_FOUND)
    }
    return medico;
  }

  async delete(id: string) {
    const persistedMedico = await this.findOne(id);
    const patientsList = persistedMedico.pacientes;
    if (patientsList && patientsList.length > 0){
      throw new BusinessLogicException(`The doctor has patients and cannot be deleted`, BusinessError.PRECONDITION_FAILED)
    }
    await this.medicoRepository.remove(persistedMedico);
  }
}




