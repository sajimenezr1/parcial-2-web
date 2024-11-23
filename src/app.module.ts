import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicosModule } from './medicos/medicos.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteMedicoModule } from './paciente-medico/paciente-medico.module';


@Module({
  imports: [MedicosModule, PacientesModule, DiagnosticosModule,PacienteMedicoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcialDatabase',
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      autoLoadEntities: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


