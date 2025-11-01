import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'Aset', description: 'Username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'aset@gmail.com', description: 'gmail' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @MinLength(8, { message: 'Password need min 8 symbols' })
  password: string;
}
