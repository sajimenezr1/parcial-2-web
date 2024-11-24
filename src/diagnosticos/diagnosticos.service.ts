import { Injectable } from '@nestjs/common';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';
import { DiagnosticoEntity } from './entities/diagnostico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException} from "../shared/business-errors"

@Injectable()
export class DiagnosticosService {

  constructor(
    @InjectRepository(DiagnosticoEntity)
    private readonly diagnosticoRepository: Repository<DiagnosticoEntity>
  ){}

  async create(createDiagnosticoDto: CreateDiagnosticoDto) {
    const {nombre, descripcion} = createDiagnosticoDto;
    if (descripcion.length > 200){
      throw new BusinessLogicException('descripcion must be less than 200 characters', BusinessError.PRECONDITION_FAILED)
    }
    return await this.diagnosticoRepository.save({nombre, descripcion});
  }

  async findAll() {
    return await this.diagnosticoRepository.find();
  }

  async findOne(id: string): Promise<DiagnosticoEntity> {
    const diagnostico:DiagnosticoEntity = await this.diagnosticoRepository.findOne({where: {id}})
    if(!diagnostico){
        throw new BusinessLogicException(`The diagnostic with id ${id} doesn't exists`, BusinessError.NOT_FOUND)
    }
    return diagnostico;
  }

  async remove(id: string) {
    const persistedDiagnostico = await this.findOne(id)
    await this.diagnosticoRepository.remove(persistedDiagnostico)
  }
}
