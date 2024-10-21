import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { kakao } from 'src/constant/oauth.constant';
import { CreateKaKaoOauthTokenRes, idToken } from './types/kakao.type';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from 'src/libs/exception/badrequest.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getAuthUrl(provider: 'google' | 'kakao') {
    if (provider === 'google') {
    }
    if (provider === 'kakao') {
      return kakao.getAuthCodeUrl({
        client_id: this.configService.get('KAKAO_CLIENT_ID'),
        redirect_uri: this.configService.get('KAKAO_CALLBACK_URL'),
      });
    }

    throw new BadRequestException('provider dose not match');
  }

  async createAuthToken(provider: 'google' | 'kakao', code: string) {
    if (provider === 'kakao') {
      const url = kakao.createAuthTokenUrl({
        client_id: this.configService.get('KAKAO_CLIENT_ID'),
        redirect_uri: this.configService.get('KAKAO_CALLBACK_URL'),
        client_secret: this.configService.get('KAKAO_CLIENT_SECRET'),
        code,
      });
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data: CreateKaKaoOauthTokenRes = await res.json();

      if ('error' in data) {
        throw new BadRequestException(data.error_description);
      }
      const { id_token, ...rest } = data;
      const idToken = this.jwtService.decode<idToken>(id_token);
      const payload = { ...idToken, token: rest };
      console.log(payload);
      return { accessToken: this.jwtService.sign(payload) };
    }

    throw new BadRequestException('provider dose not match');
  }
}
