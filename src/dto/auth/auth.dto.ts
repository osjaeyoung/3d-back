import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthTokenDto {
  @ApiProperty({
    enum: ['kakao', 'google'],
  })
  provider: 'kakao' | 'google';

  @ApiProperty({
    type: 'string',
  })
  code: string;
}
