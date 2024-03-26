import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as AllModules from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FcmModule } from './modules/nestjs-fcm/fcm.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReverseProxyMiddleware } from './middlewares/reverse-proxy.middleware';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReverseProxyMiddleware).forRoutes("/jikan");
  }
}
