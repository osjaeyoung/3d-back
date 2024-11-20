import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user/create.user.dto';
import { SigninUserDto } from 'src/dto/user/signin.user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    type: OmitType(CreateUserDto, ['pwd'] as const),
  })
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @ApiBody({
    type: SigninUserDto,
  })
  @ApiResponse({
    status: 201,
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0MSIsImlzcyI6Imh0dHBzOi8vZGl5cGFwZXIubmV0IiwiZXhwIjoxNzI5NjgxMjE5LCJpYXQiOjE3Mjk2Nzc2MTl9.nDTUoY0Rv-YF5BeWyihbJEEsnSVose7QRuhLJlsPYHM',
        },
        name: {
          type: 'string',
          example: '김아무개',
        },
        email: {
          type: 'string',
          example: 'papertoy@gmail.com"',
        },
      },
    },
  })
  @Post('/signin')
  async signin(@Body() signinUserDto: SigninUserDto) {
    const { userId, pwd } = signinUserDto;
    const user = await this.userService.findByUserId(userId);
    return this.userService.signin(user, pwd);
  }
}
