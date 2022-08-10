import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  balanceUSD: number;

  @Prop({ required: true })
  balanceCOP: number;

  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
