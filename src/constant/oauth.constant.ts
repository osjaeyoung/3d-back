export const kakao = {
  getAuthCodeUrl: ({ client_id, redirect_uri }) =>
    `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`,
  createAuthTokenUrl: ({ client_id, redirect_uri, client_secret, code }) =>
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}&client_secret=${client_secret}`,
};

export const google = {
  getAuthCodeUrl: ({ client_id, redirect_uri }) =>
    `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid&client_id=${client_id}&redirect_uri=${redirect_uri}`,
  createAuthTokenUrl: ({ client_id, redirect_uri, client_secret, code }) =>
    `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}&client_secret=${client_secret}`,
};
