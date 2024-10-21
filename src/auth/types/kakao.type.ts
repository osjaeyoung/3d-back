export type CreateKaKaoOauthTokenRes = KaKaoOauthToken | KaKaoOauthTokenError;

export type KaKaoOauthToken = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: 'bearer';
};

export type KaKaoOauthTokenError = {
  error: string;
  error_description: string;
  error_code: string;
};

export type idToken = {
  /**
   * ID 토큰이 발급된 앱의 앱 키
   */
  aud: string;
  /**
   * D 토큰에 해당하는 사용자의 회원번호
   */
  sub: string;
  /**
   * 사용자가 카카오 로그인을 통해 인증을 완료한 시각
   */
  auth_time: number;
  /**
   * ID 토큰을 발급한 인증 기관 정보
   */
  iss: 'https://kauth.kakao.com';
  /**
   * 만료 시간
   */
  exp: number;
  /**
   * ID 토큰 발급 또는 갱신 시각
   */
  iat: number;
};
