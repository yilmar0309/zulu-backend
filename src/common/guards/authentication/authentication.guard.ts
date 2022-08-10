import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guard to use only for the rest requests.
 *
 * @example
 * @decorator @UseGuards(RestAuthenticationGuard)
 * @decorator @Controller("yourController")
 * export class YourController {...}
 */
@Injectable({ scope: Scope.REQUEST })
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (
      this.authService.isPublic(context) ||
      !!(await this.authService.parseAndSetJWT(context))
    );
  }
}
