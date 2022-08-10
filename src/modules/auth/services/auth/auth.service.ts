import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JWTExpirationTime } from 'src/common/enums/auth.enum';
import { RoleEnum } from 'src/common/enums/role.enum';
import { CryptoHelper } from 'src/common/helpers/crypto/crypto.helper';
import { CreateJwtParams } from 'src/common/interfaces/authorization.interface';
import { UserLoginDto, UserRegisterDto } from '../../dto/user.dto';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  public async createJWT(params: CreateJwtParams): Promise<string> {
    return this.cryptoHelper.generateJWT(params);
  }

  private async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(user: UserRegisterDto): Promise<User> {
    if (await this.getUserByEmail(user.email)) {
      throw new BadRequestException('ERROR.EMAIL_USED');
    }
    const newUser = {
      ...user,
      password: await this.cryptoHelper.hashPassword(user.password),
    };
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async signIn(params: UserLoginDto): Promise<{ user: User; jwt: string }> {
    const user = await this.userModel.findOne({ email: params.email }).exec();
    if (!user) {
      throw new UnauthorizedException('ERROR.UNAUTHORIZED');
    }

    if (
      !(await this.cryptoHelper.comparePasswords({
        plain: params.password,
        hashed: user.password,
      }))
    ) {
      throw new UnauthorizedException('ERROR.UNAUTHORIZED');
    }

    const jwt = await this.createJWT({
      payload: { userId: user.id, role: RoleEnum.USER },
      options: { expiresIn: JWTExpirationTime.OneDay },
    });

    return { user, jwt };
  }
}
