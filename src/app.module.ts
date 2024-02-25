import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './modules/videos/videos.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules';
import { JwtAuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:aniflix@cluster0.qxdesef.mongodb.net/'),
    UsersModule,
    AuthModule,
    VideosModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: JwtAuthGuard,
  }],
})
export class AppModule { }
