import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthTokenDto } from 'src/dto/auth/auth.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'oauth 로그인 url을 제공합니다.',
  })
  @ApiQuery({
    name: 'provider',
    enum: ['google', 'kakao'],
  })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        url: {
          type: 'string',
          example:
            'https://kauth.kakao.com/oauth/authorize?client_id=8b637bf46972737dcd4c132f538508d8&redirect_uri=http://localhost:3000/oauth/callback/kakao&response_type=code',
        },
      },
    },
  })
  @Get('url')
  getAuthUrl(@Query('provider') provider: 'google' | 'kakao') {
    const url = this.authService.getAuthUrl(provider);
    return { url };
  }

  @ApiOperation({
    summary: 'oauth 로그인',
  })
  @ApiBody({
    type: CreateAuthTokenDto,
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
      },
    },
  })
  @Post('login')
  async createAuthToken(@Body() createAutthTokenDto: CreateAuthTokenDto) {
    const { provider, code } = createAutthTokenDto;
    const data = await this.authService.createAuthToken(provider, code);
    return data;
  }
}
