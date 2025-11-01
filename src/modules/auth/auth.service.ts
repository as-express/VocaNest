import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../user/user.service';
import { GoogleUserDto } from './dto/google.dto';
import { MailerService } from '../mailer/mailer.service';
import { redis } from 'src/config/redis.config';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
  ) {}

  async signup(dto: SignUpDto) {
    await this.userService.userChecker(dto.email, true);

    await redis.set(`user:${dto.email}`, JSON.stringify(dto), 'EX', 300);
    await this.requestVerification(dto.email);

    return { message: 'Verification code send to your email' };
  }

  async storeUser(dto: SignUpDto) {
    dto.password = await hash(dto.password);
    const user = await this.userService.createUser(dto);

    await user.save();
    return this.issueToken(user.id);
  }

  async signin(dto: SignInDto) {
    const user = await this.userService.userChecker(dto.email, false);

    const isPass = await verify(user.password, dto.password);
    if (!isPass) {
      throw new BadRequestException('Password is not right');
    }

    return this.issueToken(user.id);
  }

  async googleLogin(userData: GoogleUserDto) {
    const user = await this.userService.createGoogleUser(userData);

    const token = await this.issueToken(user._id.toString());

    return {
      token,
      user,
    };
  }

  async requestVerification(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:${email}`, code, 'EX', 300);

    await this.mailer.sendMail(email, 'Your Verification Code', code);
    return { message: 'Verification code sent' };
  }

  async verifyCode(dto: VerifyDto) {
    const savedCode = await redis.get(`otp:${dto.email}`);
    if (savedCode !== dto.code) {
      throw new BadRequestException('Incorrect otp code');
    }

    await redis.del(`otp:${dto.email}`);
    const data = await redis.get(`user:${dto.email}`);

    return this.storeUser(JSON.parse(data));
  }

  private async issueToken(userId: string) {
    const data = { id: userId };
    const token = this.jwt.sign(data, {
      expiresIn: '1d',
    });

    return { token };
  }
}
