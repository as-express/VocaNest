import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ModuleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
