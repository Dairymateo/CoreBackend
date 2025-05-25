/* eslint-disable prettier/prettier */
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

/* eslint-disable prettier/prettier */
export class SignupDTO {
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/, {
    message: 'password too weak',
  })
  password: string;
}
