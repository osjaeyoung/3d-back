import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { BLENDER_FILE_DIR, MESHROOM_OBJ_DIR } from 'src/constant/file.constant';
import { FileDownloadDto } from 'src/dto/file/file.download.dto';
import { BadRequestException } from 'src/libs/exception/badrequest.exception';
import { readFile } from 'src/utils/file';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file is required');
    }
  }

  download(query: FileDownloadDto) {
    const read = (dir: string) => {
      readFile(dir);
      const file = createReadStream(dir);
      const fileName = String(file.path).split('\\').slice(-1)[0];
      return { file, fileName };
    };

    if (Object.keys(query).length === 0) {
      return read(MESHROOM_OBJ_DIR);
    }

    if (query.type === 'blender') {
      return read(BLENDER_FILE_DIR);
    }

    throw new BadRequestException('file type not matched');
  }
}
