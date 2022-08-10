import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesAuth } from 'src/common/decorators/auth/roles-auth.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { WalletResponse } from '../../classToResponse/WalletResponse';
import { WalletDto } from '../../dto/wallet.dto';
import { Wallet } from '../../schemas/wallet.schema';
import { WalletService } from '../../services/wallet/wallet.service';

@ApiBearerAuth()
@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private service: WalletService) {}

  @ApiResponse({
    status: 200,
    description: 'The create Audio has been successfully created.',
    type: WalletResponse,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorizate',
  })
  @Post('update-wallet')
  @RolesAuth(RoleEnum.USER)
  async create(@Body() data: WalletDto) {
    return await this.service.updateWallet(data);
  }

  @ApiResponse({
    status: 200,
    description: 'The get Wallet has been successfully get.',
    type: WalletResponse,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @RolesAuth(RoleEnum.USER)
  @Get('get-wallet-by-user/:id')
  async findById(@Param() param): Promise<Wallet> {
    return this.service.getWalletByUser(param.id);
  }
}
