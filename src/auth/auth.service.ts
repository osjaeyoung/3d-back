import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, kakao } from 'src/constant/oauth.constant';
import { CreateKaKaoOauthTokenRes, KaKaoIdToken } from './types/kakao.type';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from 'src/libs/exception/badrequest.exception';
import { CreateGoogleOauthTokenRes, GoogleIdToken } from './types/google.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getAuthUrl(provider: 'google' | 'kakao') {
    if (provider === 'google') {
      return google.getAuthCodeUrl({
        client_id: this.configService.get('GOOGLE_CLIENT_ID'),
        redirect_uri: this.configService.get('GOOGLE_CALLBACK_URL'),
      });
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
    if (provider === 'google') {
      const url = google.createAuthTokenUrl({
        client_id: this.configService.get('GOOGLE_CLIENT_ID'),
        redirect_uri: this.configService.get('GOOGLE_CALLBACK_URL'),
        client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
        code,
      });
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data: CreateGoogleOauthTokenRes = await res.json();

      if ('error' in data) {
        throw new BadRequestException(data.error_description);
      }

      const { id_token, ...rest } = data;
      const idToken = this.jwtService.decode<GoogleIdToken>(id_token);
      console.log(idToken);
      const payload = { ...idToken, token: rest };
      return { accessToken: this.jwtService.sign(payload) };
    }

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
      const idToken = this.jwtService.decode<KaKaoIdToken>(id_token);
      const payload = { ...idToken, token: rest };

      return { accessToken: this.jwtService.sign(payload) };
    }

    throw new BadRequestException('provider dose not match');
  }
}
