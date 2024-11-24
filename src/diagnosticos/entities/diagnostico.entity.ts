import { PacienteEntity } from "../../pacientes/entities/paciente.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiagnosticoEntity {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    nombre:string;

    @Column()
    descripcion:string;

    @ManyToMany(() => PacienteEntity,
    paciente => paciente.diagnosticos)
    pacientes: PacienteEntity[];
}
