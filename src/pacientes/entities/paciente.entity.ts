import { DiagnosticoEntity } from "src/diagnosticos/entities/diagnostico.entity";
import { MedicoEntity } from "src/medicos/entities/medico.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PacienteEntity {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    nombre:string;

    @Column()
    genero:string;

    @ManyToMany(() => MedicoEntity,
    medico => medico.pacientes)
    medicos: MedicoEntity[];

    @ManyToMany(() => DiagnosticoEntity,
    diagnostico => diagnostico.pacientes)
    diagnosticos: DiagnosticoEntity[];
}
