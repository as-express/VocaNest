import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TextTranslateDto {
  @ApiProperty({ example: 'ru', description: 'from lang' })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({ example: 'en', description: 'to lang' })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({ example: 'привет', description: 'text' })
  @IsNotEmpty()
  @IsString()
  text: string;
}
