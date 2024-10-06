import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { MESHROOM_OBJ_DIR } from 'src/constant/file.constant';

@Injectable()
export class FileService {
  download() {
    const file = createReadStream(MESHROOM_OBJ_DIR);
    return file;
  }
}
