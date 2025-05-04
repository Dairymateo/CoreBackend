/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() signupData: SignupDTO) {
    return this.authService.signup(signupData);
    
  }

  @Post('login')
  async login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }




}
