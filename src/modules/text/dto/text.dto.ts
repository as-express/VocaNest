import { IsNotEmpty, IsString } from 'class-validator';

export class TextDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  textFrom: string;
}
