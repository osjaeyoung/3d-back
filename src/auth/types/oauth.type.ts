import { KaKaoIdToken, KaKaoOauthToken } from './kakao.type';
import { GoogleIdToken, GoogleOauthToken } from './google.type';

type KakaoUser = KaKaoIdToken & { token: KaKaoOauthToken };
type GoogleUser = GoogleIdToken & { token: GoogleOauthToken };
export type User = KakaoUser | GoogleUser;
