import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { SignUpDto } from '../auth/dto/signup.dto';
import { GoogleUserDto } from '../auth/dto/google.dto';
import { MailerService } from '../mailer/mailer.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<User>,
    private readonly mailer: MailerService,
  ) {}

  async createUser(dto: SignUpDto) {
    const user = new this.userSchema(dto);
    return user;
  }

  async userChecker(email: string, isNew: boolean) {
    const user = await this.userSchema.findOne({ email });
    if (isNew ? user : !user) {
      const errMsg = isNew
        ? 'User is already exists'
        : 'User is not authorized';
      throw new BadRequestException(errMsg);
    }

    return user;
  }

  async createGoogleUser(dto: GoogleUserDto) {
    const user = await this.userSchema.findOne({ email: dto.email });
    if (user) {
      return user;
    } else {
      const password = faker.internet.password({
        length: 12,
        memorable: false,
        pattern: /[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]/,
      });

      const newUser = new this.userSchema({
        username: dto.firstName,
        avatar: dto.picture,
        email: dto.email,
        password,
      });
      await newUser.save();

      await this.mailer.sendMail(dto.email, 'Your Password', password);
      return newUser;
    }
  }

  async getProfile(id: string) {
    const user = await this.userSchema.findById(id).select('-password');
    return user;
  }
}
