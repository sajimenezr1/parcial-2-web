import { IsString, MinLength } from "class-validator";

export class CreatePacienteDto {
    
    @IsString()
    @MinLength(3)
    nombre:string;

    @IsString()
    genero:string;
}
