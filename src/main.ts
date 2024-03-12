
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/response-transform.interceptor';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  //get reflector
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
