import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ModuleUpdDto {
  @ApiProperty({ example: 'English', description: 'title' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: 'text for description', description: 'description' })
  @IsOptional()
  @IsString()
  description: string;
}
