/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Llama al método canActivate de la clase padre (AuthGuard)
    // con el nombre de la estrategia Passport que queremos usar ('jwt' en este caso).
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    // Si hay un error al autenticar o no hay usuario, lanza una excepción.
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // Si la autenticación es exitosa, el 'user' es adjuntado a la 'request'.
    return user;
  }
}