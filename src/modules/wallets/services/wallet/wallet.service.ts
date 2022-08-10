import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletDto } from '../../dto/wallet.dto';
import { Wallet, WalletDocument } from '../../schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  public async getWalletByUser(userId: string): Promise<Wallet> {
    return await this.walletModel.findOne({ userId: userId });
  }

  async updateWallet(wallet: WalletDto): Promise<Wallet> {
    const resultWallet = await this.getWalletByUser(wallet.userId);
    if (resultWallet) {
      const update = {
        balanceUSD: resultWallet.balanceUSD + wallet.money,
        balanceCOP:
          (resultWallet.balanceUSD + wallet.money) *
          parseInt(process.env.DOLAR),
      };
      return await this.walletModel.findByIdAndUpdate(resultWallet._id, update);
    }
    const createdWallet = new this.walletModel(wallet);
    return createdWallet.save();
  }
}
