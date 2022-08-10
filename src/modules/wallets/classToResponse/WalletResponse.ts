import { ApiProperty } from '@nestjs/swagger';

export class WalletResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  balanceUSD: string;

  @ApiProperty()
  balanceCOP: string;
}
