import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicoDto {

    @IsString()
    @IsNotEmpty()
    nombre:string;

    @IsString()
    @IsNotEmpty()
    especialidad:string;

    @IsString()
    telefono:string;

}
