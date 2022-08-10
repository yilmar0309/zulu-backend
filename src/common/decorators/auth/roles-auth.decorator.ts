import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../guards/authorization/authorization.guard';
import { RoleEnum } from '../../enums/role.enum';
import { ROLES_KEY } from '../../constants/auth.constant';

/**
 * Allows to check if a user has a certain role.
 *
 * @example
 * @decorator `@RolesAuth(RoleEnum.Admin, RoleEnum.Registered)`
 * @decorator `@YourQuery(returns => SellableItem)`
 * async yourQuery(): Promise<SellableItem> {...}
 */
export function RolesAuth(...roles: RoleEnum[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthorizationGuard),
  );
}
