import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { MESHROOM_OBJ_DIR } from 'src/constant/file.constant';
import { BadRequestException } from 'src/libs/exception/badrequest.exception';
import { readFile } from 'src/utils/file';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file is required');
    }
  }

  download() {
    readFile(MESHROOM_OBJ_DIR);
    const file = createReadStream(MESHROOM_OBJ_DIR);
    return file;
  }
}
