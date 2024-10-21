export class CreateAuthTokenDto {
  provider: 'kakao' | 'google';
  code: string;
}
