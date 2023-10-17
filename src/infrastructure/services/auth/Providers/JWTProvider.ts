import * as jwt from 'jsonwebtoken';

import { authConfig } from '@base/config/auth';

export class JWTProvider {
  public sign(payload: object, dataReturn: object): object {
    return {
      ...dataReturn,
      access_token: jwt.sign(payload, authConfig.providers.jwt.secret),
    };
  }
}
