
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/response-transform.interceptor';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
