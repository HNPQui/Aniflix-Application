import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './modules/auth/auth.guard';
import * as AllModules from './modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:aniflix@cluster0.qxdesef.mongodb.net/'),
    ...Object.values(AllModules)
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: JwtAuthGuard,
  }],
})
export class AppModule { }
