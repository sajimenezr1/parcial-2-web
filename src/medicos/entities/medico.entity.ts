import { PacienteEntity } from "src/pacientes/entities/paciente.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicoEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre:string;

    @Column()
    especialidad:string;

    @Column()
    telefono:string;

    @ManyToMany(() => PacienteEntity,
    paciente => paciente.medicos)
    pacientes: PacienteEntity[];
}
