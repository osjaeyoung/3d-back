import { ERROR } from 'src/constant/error.constant';
import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED, message);
  }
}
