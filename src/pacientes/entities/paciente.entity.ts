import { DiagnosticoEntity } from "../../diagnosticos/entities/diagnostico.entity";
import { MedicoEntity } from "../../medicos/entities/medico.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @JoinTable()
    medicos: MedicoEntity[];

    @ManyToMany(() => DiagnosticoEntity,
    diagnostico => diagnostico.pacientes, {cascade:true})
    @JoinTable()
    diagnosticos: DiagnosticoEntity[];
}
