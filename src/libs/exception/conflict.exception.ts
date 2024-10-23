import { ERROR } from 'src/constant/error.constant';
import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class ConflictException extends BaseException {
  constructor(message: string) {
    super(ERROR.CONFLICT, HttpStatus.CONFLICT, message);
  }
}
