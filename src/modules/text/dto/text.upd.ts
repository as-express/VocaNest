import { IsNotEmpty, IsString } from 'class-validator';

export class TextUpdDto {
  @IsNotEmpty()
  @IsString()
  textTo: string;
}
