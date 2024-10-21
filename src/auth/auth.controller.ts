import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthTokenDto } from 'src/dto/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('url')
  getAuthUrl(@Query('provider') provider: 'google' | 'kakao') {
    const url = this.authService.getAuthUrl(provider);
    return { url };
  }

  @Post('login')
  async createAuthToken(@Body() createAutthTokenDto: CreateAuthTokenDto) {
    const { provider, code } = createAutthTokenDto;
    const data = await this.authService.createAuthToken(provider, code);
    return { data };
  }
}
