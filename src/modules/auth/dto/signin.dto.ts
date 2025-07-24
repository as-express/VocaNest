import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'Password need min 8 symbols' })
  password: string;
}
