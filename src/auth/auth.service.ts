/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
  private jwtService: JwtService,
) {}

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


  async login(credentials: LoginDTO){
    const {email, password} = credentials;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    

    const tokens = await this.generateuserToken(user._id);
    return {
      ...tokens,
      userId: user._id,
    }
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOneAndDelete({ 
      token: refreshToken, 
      expiryDate: { $gte: new Date() }, 
    });

    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateuserToken(token.userId);
  }


  async generateuserToken(userId){

    const accesstoken =this.jwtService.sign({userId}, {expiresIn: '1h'});
    const refreshtoken = uuidv4();

    await this.storeRefreshToken(refreshtoken, userId);
    return {
      accesstoken,
      refreshtoken
    };
  }



  async storeRefreshToken(token:string, userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3); 
    await this.RefreshTokenModel.create({token, userId, expiryDate });
  }  
}


