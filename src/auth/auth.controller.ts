import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthTokenDto } from 'src/dto/auth/auth.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  @Post('login')
  async createAuthToken(@Body() createAutthTokenDto: CreateAuthTokenDto) {
    const { provider, code } = createAutthTokenDto;
    const data = await this.authService.createAuthToken(provider, code);
    return { data };
  }
}
