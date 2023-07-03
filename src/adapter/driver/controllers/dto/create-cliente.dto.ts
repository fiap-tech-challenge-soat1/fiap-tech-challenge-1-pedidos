import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { CpfJaExiste } from "src/core/clientes/rules/cpf-unique.rule";

export class CreateClienteDto {
    @IsString()
    @ApiProperty({ example: 'João Santos', description: 'O nome do cliente'})
    readonly nome: String;

    @IsString()
    @CpfJaExiste()
    @ApiProperty({ example: '999.999.999-99', description: 'O CPF do cliente'})
    readonly cpf: String;

    @IsEmail()
    @ApiProperty({ example: 'joao@example.com.br', description: 'O email do cliente'})
    readonly email: String;
}
