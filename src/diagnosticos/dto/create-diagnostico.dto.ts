import { IsString, MaxLength } from "class-validator";

export class CreateDiagnosticoDto {

    @IsString()
    nombre:string;

    @IsString()
    @MaxLength(200)
    descripcion:string;
}
