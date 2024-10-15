import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitSwaggerDocument } from './libs/swagger/swagger.document';
import { AllExceptionFilter } from './libs/filter/exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  new InitSwaggerDocument(app);
  app.useGlobalFilters(new AllExceptionFilter());

  console.log('server listening port', port);
  await app.listen(port);
}
bootstrap();
