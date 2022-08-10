import { Global, Module } from '@nestjs/common';
import { CryptoHelper } from './crypto/crypto.helper';

@Global()
@Module({
  providers: [CryptoHelper],
  exports: [CryptoHelper],
})
export class CommonHelpersModule {}
