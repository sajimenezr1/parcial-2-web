import { TypeOrmModule } from "@nestjs/typeorm";
import { DiagnosticoEntity } from "../../diagnosticos/entities/diagnostico.entity";
import { MedicoEntity } from "../../medicos/entities/medico.entity";
import { PacienteEntity } from "../../pacientes/entities/paciente.entity";

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [PacienteEntity, MedicoEntity, DiagnosticoEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([PacienteEntity, MedicoEntity, DiagnosticoEntity])
];