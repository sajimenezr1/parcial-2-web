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
    return await this.medicoRepository.save({nombre, especialidad, telefono})
  }

  async findAll() {
    return await this.medicoRepository.find();
  }


  async findOne(id: string) : Promise<MedicoEntity> {
    const medico:MedicoEntity = await this.medicoRepository.findOne({where: {id}});
    if (!medico){
        throw new BusinessLogicException(`The medic with id ${id} doesn't exists`, BusinessError.NOT_FOUND)
    }
    return medico;
  }

  async delete(id: string) {
    const persistedMedico = await this.findOne(id);
    await this.medicoRepository.remove(persistedMedico);
  }
}




