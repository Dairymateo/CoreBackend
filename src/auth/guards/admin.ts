/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request['user']; 

    
    console.log('User:', user);  

    const adminUserId = process.env.ADMIN_USER_ID;

    if (!user || user.userId !== adminUserId) {
      throw new UnauthorizedException('Acceso no autorizado. Se requiere ser el administrador.');
    }

    return true;
  }
}