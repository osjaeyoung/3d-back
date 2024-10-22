export type CreateGoogleOauthTokenRes =
  | GoogleOauthToken
  | GoogleOauthTokenError;

export type GoogleOauthToken = {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: 'openid';
  token_type: 'Bearer';
};

export type GoogleOauthTokenError = {
  error: 'invalid_grant';
  error_description: string;
};

export type GoogleIdToken = {
  /**
   * ID 토큰이 발급된 앱의 앱 키
   */
  aud: string;
  azp: string;
  /**
   * D 토큰에 해당하는 사용자의 회원번호
   */
  sub: string;

  at_hash: string;
  /**
   * ID 토큰을 발급한 인증 기관 정보
   */
  iss: 'https://accounts.google.com';
  /**
   * 만료 시간
   */
  exp: number;
  /**
   * ID 토큰 발급 또는 갱신 시각
   */
  iat: number;
};
