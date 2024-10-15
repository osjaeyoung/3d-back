import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: '지원 확장자 : [jpg, jpeg, png, bmp] <br> 파일 최대 개수 : 6',
  })
  files: any[];
}
