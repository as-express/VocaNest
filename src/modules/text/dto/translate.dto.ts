import { IsNotEmpty, IsString } from 'class-validator';

export class TextTranslateDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
