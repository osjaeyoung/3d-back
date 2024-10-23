import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsStrongPassword,
  Length,
  Matches,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    minLength: 1,
    maxLength: 20,
    example: '김아무개',
  })
  @NotContains(' ')
  @Length(1, 20, { message: 'Name length must be between 1 and 50 characters' })
  name: string;

  @ApiProperty({
    type: 'string',
    minLength: 3,
    maxLength: 20,
    pattern: '^\\w+$',
    description: '영문자, 숫자, _ 만 사용 가능합니다.',
    example: 'papertoy123',
  })
  @NotContains(' ')
  @Length(3, 20, { message: 'User ID must be between 3 and 50 characters' })
  @Matches(RegExp('^\\w+$'), {
    message: 'Only English letters, numbers, and underscores are allowed',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    minLength: 8,
    description: '소문자, 숫자, 특수문자를 각 1개 이상 포함해야 합니다.',
    example: 'qwer1234!',
  })
  @NotContains(' ')
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 0,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 8 characters, including at least one lowercase letter, special character, and number.',
    },
  )
  pwd: string;

  @ApiProperty({ type: 'string', example: 'papertoy@gmail.com' })
  @IsEmail({}, { message: 'Email format is incorrect' })
  email: string;
}
