import { Module } from '@nestjs/common';
import { PacienteMedicoService } from './paciente-medico.service';
import { PacienteMedicoController } from './paciente-medico.controller';
import { MedicosModule } from '../medicos/medicos.module';
import { PacientesModule } from '../pacientes/pacientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteEntity } from '../pacientes/entities/paciente.entity';


@Module({
  controllers: [PacienteMedicoController],
  providers: [PacienteMedicoService],
  imports: [MedicosModule, PacientesModule,
    TypeOrmModule.forFeature([PacienteEntity]),
  ],
  exports: [PacienteMedicoService]
})
export class PacienteMedicoModule {}
