import { ERROR } from 'src/constant/error.constant';
import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class UnCatchedException extends BaseException {
  constructor(message: string) {
    super(ERROR.UNCATCHED, HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
