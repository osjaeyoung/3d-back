export const kakao = {
  getAuthCodeUrl: ({ client_id, redirect_uri }) =>
    `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`,
  createAuthTokenUrl: ({ client_id, redirect_uri, client_secret, code }) =>
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}&client_secret=${client_secret}`,
  validateTokenInfoUrl: () =>
    'https://kapi.kakao.com/v1/user/access_token_info',
};
