import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitSwaggerDocument } from './libs/swagger/swagger.document';
import { AllExceptionFilter } from './libs/filter/exception.filter';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { BadRequestException } from './libs/exception/badrequest.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  new InitSwaggerDocument(app);

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (valdationErrors: ValidationError[] = []) => {
        const errMsg = valdationErrors
          .map((v) => Object.values(v.constraints)[0])
          .join('\n');
        return new BadRequestException(errMsg);
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  console.log('server listening port', port);
  await app.listen(port);
}
bootstrap();
