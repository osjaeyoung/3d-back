import { ApiProperty } from '@nestjs/swagger';

enum DownloadType {
  blender = 'blender',
}

export class FileDownloadDto {
  @ApiProperty({
    enum: ['blender'],
    required: false,
  })
  type: DownloadType;
}
