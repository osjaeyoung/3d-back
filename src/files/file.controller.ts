import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { fileNameEditor, imageFileFilter } from './file.util';
import { FILE_UPLOAD_DIR } from 'src/constant/file.constant';
import { FileUploadInterceptor } from './interceptors/file.upload.interceptor';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileUploadInterceptor,
    FilesInterceptor('files', 6, {
      storage: diskStorage({
        filename: fileNameEditor,
        destination: FILE_UPLOAD_DIR,
      }),
      limits: {
        fileSize: 1000 * 1000 * 10,
      },
      fileFilter: imageFileFilter,
    }),
  )
  uploadFiles() {
    return 'OK';
  }
}
