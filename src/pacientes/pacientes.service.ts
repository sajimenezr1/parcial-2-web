import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteEntity } from './entities/paciente.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException} from "../shared/business-errors"
@Injectable()
export class PacientesService {

  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>
  ){}

  async create(createPacienteDto: CreatePacienteDto) {
    const {nombre, genero} = createPacienteDto;
    return await this.pacienteRepository.save({nombre, genero});
  }

  async findAll() {
    return await this.pacienteRepository.find();
  }

  async findOne(id: string): Promise<PacienteEntity> {
    const paciente:PacienteEntity = await this.pacienteRepository.findOne({where: {id}});
    if(!paciente){
      throw new BusinessLogicException(`The pacient with id ${id} doesn't exists`, BusinessError.NOT_FOUND)
    }
    return paciente;
  }

  async remove(id: string) {
    const persistedPaciente = await this.findOne(id);
    await this.pacienteRepository.remove(persistedPaciente);
  }
}
