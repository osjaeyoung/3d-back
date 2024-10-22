import { User } from 'src/auth/types/oauth.type';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
