import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDto {
  @ApiProperty({
    type: 'string',
    minLength: 3,
    maxLength: 20,
    pattern: '^\\w+$',
    description: '영문자, 숫자, _ 만 사용 가능합니다.',
    example: 'papertoy123',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    minLength: 8,
    description: '소문자, 숫자, 특수문자를 각 1개 이상 포함해야 합니다.',
    example: 'qwer1234!',
  })
  pwd: string;
}
