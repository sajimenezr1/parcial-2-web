import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { MedicoEntity } from './entities/medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MedicosController],
  providers: [MedicosService],
  imports: [TypeOrmModule.forFeature([MedicoEntity])]
})
export class MedicosModule {}
