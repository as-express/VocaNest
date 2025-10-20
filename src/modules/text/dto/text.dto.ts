import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class TextDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsArray()
  textFrom: string[];
}
