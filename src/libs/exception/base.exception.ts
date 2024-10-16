import { HttpException } from '@nestjs/common';
import { IBaseException } from '../interface/exception/base.exception.interface';
import { ApiProperty } from '@nestjs/swagger';

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number, message?: string) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.message = message;
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  message: string;
}
