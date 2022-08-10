import { RoleEnum } from '../enums/role.enum';
import { JWTExpirationTime } from '../enums/auth.enum';

export interface ClientRefreshToken {
  id: string;
  secretToken: string;
  userId: string;
}

export interface B64RefreshToken {
  refreshToken: string;
}

export interface JWTBody {
  userId: string;
  role: RoleEnum;
}

export type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';
``;

export interface JWT {
  header: {
    alg: Algorithm;
    typ: string;
    kid: string;
  };
  payload: JWTBody;
}

export interface CreateJwtParams {
  payload: {
    userId: string;
    role?: RoleEnum;
    username?: string;
  };
  options: {
    expiresIn: JWTExpirationTime;
  };
}
