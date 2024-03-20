import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './modules/auth/auth.guard';
import * as AllModules from './modules';
import { ConfigModule } from '@nestjs/config';
import { FcmModule } from 'utils/nestjs-fcm';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:aniflix@cluster0.qxdesef.mongodb.net/'),
    FcmModule.forRoot({
      firebaseSpecsPath: 'src/firebase-adminsdk.json'
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...Object.values(AllModules)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
