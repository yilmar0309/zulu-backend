import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../../constants/auth.constant';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

/**
 * Needed to declare a route as public.
 *
 * @example
 * @decorator `@Public()`
 * @decorator `@Get('public-endpoint')`
 * public async publicEndpoint(): Promise<Something> {...}
 *
 */
export const Public = (): CustomDecorator<unknown> =>
  SetMetadata(IS_PUBLIC_KEY, true);
