import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsInt,
  Min
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'Username en minúsculas siguiendo el estándar de Instagram',
    example: 'usuario_ejemplo',
    pattern: '^[a-z][a-z0-9_]{2,29}$',
    minLength: 3,
    maxLength: 30
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z][a-z0-9_]{2,29}$/, {
    message:
      'El username debe estar en minúsculas, sin espacios, comenzar por letra y usar solo letras, números o guión bajo.'
  })
  name: string

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'correo@dominio.com'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Contraseña en texto plano (se encripta antes de guardar)',
    format: 'password',
    minLength: 8,
    example: 'clave_segura_123'
  })
  @IsString()
  @MinLength(8)
  password: string

  @ApiPropertyOptional({
    description: 'Edad del usuario (opcional)',
    example: 25,
    minimum: 0
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number
}
