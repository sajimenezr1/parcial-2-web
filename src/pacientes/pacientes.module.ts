import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { PacienteEntity } from './entities/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService],
  imports: [TypeOrmModule.forFeature([PacienteEntity])]
})
export class PacientesModule {}
