/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  const authService = app.get(AuthService);

  // Define las credenciales del administrador desde las variables de entorno
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Administrator';

  // Verifica si las credenciales del administrador están definidas y llama al método del servicio
  if (adminEmail && adminPassword) {
    await authService.createAdminUser(adminEmail, adminPassword, adminName);
  } else {
    console.warn('Advertencia: No se encontraron las credenciales del administrador en las variables de entorno.');
  }

  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,

  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
