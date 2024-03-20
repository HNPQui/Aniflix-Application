
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/response-transform.interceptor';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/auth.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor());
  const configService: ConfigService = app.get(ConfigService);
  const httpPort = configService.get('HTTP_PORT');
  await app.listen(httpPort);
}
bootstrap();
