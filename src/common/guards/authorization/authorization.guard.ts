import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
} from '@nestjs/common';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.authService.checkUserRoles(context);
  }
}
