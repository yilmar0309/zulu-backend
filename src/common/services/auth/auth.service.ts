import {
  ExecutionContext,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTBody } from '../../interfaces/authorization.interface';
import { Headers } from '../../enums/headers.enum';
import { IS_PUBLIC_KEY, ROLES_KEY } from '../../constants/auth.constant';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../enums/role.enum';
import { CryptoHelper } from '../../helpers/crypto/crypto.helper';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/auth/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private sessionToken: JWTBody;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cryptoHelper: CryptoHelper,
    private readonly reflector: Reflector,
  ) {}

  public async parseAndSetJWT(context: ExecutionContext): Promise<JWTBody> {
    this.sessionToken = await this.parseJwt(
      context.switchToHttp().getRequest<Request>(),
    );
    return this.sessionToken;
  }

  public async parseJwt(request: Request): Promise<JWTBody> {
    try {
      const jwt = request.headers[Headers.Authorization].slice(7);
      return this.cryptoHelper.verifyJWT<JWTBody>(jwt);
    } catch (e) {
      console.log('ERROR JWT', e);
      throw new UnauthorizedException();
    }
  }

  /**
   * Checks if IS_PUBLIC_KEY is present in the metadata, in this case ignore the jwt authentication.
   */
  public isPublic(context: ExecutionContext): boolean {
    return !!this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  public async checkUserRoles(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (this.sessionToken.role === RoleEnum.ADMIN) {
      return true;
    }

    return requiredRoles.some((role) => this.sessionToken.role === role);
  }

  public getSessionToken(): JWTBody {
    return this.sessionToken;
  }
}
