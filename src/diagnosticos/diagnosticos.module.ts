import { Module } from '@nestjs/common';
import { DiagnosticosService } from './diagnosticos.service';
import { DiagnosticosController } from './diagnosticos.controller';
import { DiagnosticoEntity } from './entities/diagnostico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DiagnosticosController],
  providers: [DiagnosticosService],
  imports: [TypeOrmModule.forFeature([DiagnosticoEntity])]
})
export class DiagnosticosModule {}
