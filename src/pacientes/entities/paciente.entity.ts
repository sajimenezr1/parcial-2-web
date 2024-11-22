import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PacienteEntity {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    nombre:string;

    @Column()
    genero:string;
}
