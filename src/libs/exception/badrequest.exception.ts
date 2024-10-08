import { ERROR } from 'src/constant/error.constant';
import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super(ERROR.BAD_REQUEST, HttpStatus.BAD_REQUEST, message);
  }
}
