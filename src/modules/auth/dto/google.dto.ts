import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GoogleUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  picture: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;
}
