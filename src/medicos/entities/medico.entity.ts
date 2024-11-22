import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
