import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseException } from '../exception/base.exception';
import { UnCatchedException } from '../exception/uncatch.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException
        ? exception
        : new UnCatchedException(exception.message);

    res.timestamp = new Date().toISOString();
    res.path = request.url;

    response.status(res.statusCode).json({
      errorCode: res.errorCode,
      statusCode: res.statusCode,
      timestamp: res.timestamp,
      path: res.path,
      message: res.message,
    });
  }
}
