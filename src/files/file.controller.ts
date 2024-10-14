/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  ParseFilePipe,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { fileNameEditor, imageFileFilter } from './file.util';
import { FILE_UPLOAD_DIR } from 'src/constant/file.constant';
import { FileUploadInterceptor } from './interceptors/file.upload.interceptor';
import { Response } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from 'src/dto/file/file.upload.dto';
import { BadRequestException } from 'src/libs/exception/badrequest.exception';
import { BaseException } from 'src/libs/exception/base.exception';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: '다중 파일 업로드',
    description: '2D 이미지를 업로드 합니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiResponse({
    status: 201,
    schema: { type: 'string' },
    example: 'ok',
  })
  @ApiResponse({
    status: 400,
    type: BaseException,
    example: {
      errorCode: '001',
      statusCode: 415,
      timestamp: '2024-10-07T08:27:41.680Z',
      path: '/file/upload',
      message: 'File must be of type jpg|jpeg|png|bmp',
    },
    description: '확장자가 올바르지 않은 경우',
  })
  @Post('upload')
  @UseInterceptors(
    FileUploadInterceptor,
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        filename: fileNameEditor,
        destination: FILE_UPLOAD_DIR,
      }),
      limits: {
        fileSize: 1000 * 1000 * 10,
        files: 20,
      },
      fileFilter: imageFileFilter,
    }),
  )
  upload(
    @UploadedFiles(
      new ParseFilePipe({
        exceptionFactory: (error) => {
          return new BadRequestException(error);
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    return 'ok';
  }

  @ApiOperation({
    summary: '파일 다운로드',
    description: '3d 이미지로 변환된 obj 파일을 다운로드 합니다.',
  })
  @ApiResponse({
    status: 200,
    schema: { type: 'string', format: 'binary' },
  })
  @Get('download')
  download(@Res() res: Response) {
    const file = this.fileService.download();
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=texturedMesh.obj',
    );
    file.pipe(res);
  }
}
