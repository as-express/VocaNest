import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ModuleDto {
  @ApiProperty({ example: 'English', description: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'text for description', description: 'description' })
  @IsOptional()
  @IsString()
  description: string;
}
