import { HttpStatus } from '@nestjs/common';
import { ERROR } from 'src/constant/error.constant';
import { BaseException } from './base.exception';

export class FileNotFoundException extends BaseException {
  constructor() {
    super(ERROR.FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class FileUnsupportedException extends BaseException {
  constructor(message: string) {
    super(
      ERROR.UNSUPPORTED_IMAGE_TYPE,
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      message,
    );
  }
}
