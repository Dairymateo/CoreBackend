/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async signup(signupData: SignupDTO) {
    const {email, password, name} = signupData;
    const emailInUse = await this.UserModel.findOne({ email, });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
