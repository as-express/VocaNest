import { IsOptional, IsString } from 'class-validator';

export class ModuleUpdDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
