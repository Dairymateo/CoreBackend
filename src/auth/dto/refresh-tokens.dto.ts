/* eslint-disable prettier/prettier */
import {IsString} from "class-validator";


export class RefreshTokensDTO {
    @IsString()
    refreshToken: string;
 
}