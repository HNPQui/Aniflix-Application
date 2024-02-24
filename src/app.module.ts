import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './modules/videos/videos.module'
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:aniflix@cluster0.qxdesef.mongodb.net/'),
   VideosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
