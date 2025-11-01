import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class TextDto {
  @ApiProperty({ example: 'ru', description: 'from lang' })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({ example: 'en', description: 'to lang' })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({ example: ['привет', 'мир'], description: 'text array' })
  @IsNotEmpty()
  @IsArray()
  textFrom: string[];
}
