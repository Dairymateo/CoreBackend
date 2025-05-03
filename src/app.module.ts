/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admintest:Udla@clusterudla01.grlj6.mongodb.net/AuthAdmin'),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
