import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TextUpdDto {
  @ApiProperty({ example: 'привет', description: 'text' })
  @IsNotEmpty()
  @IsString()
  textTo: string;
}
