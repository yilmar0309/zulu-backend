import { Injectable } from '@nestjs/common';
import { randomBytes, createHash, timingSafeEqual } from 'crypto';
import { v4 } from 'uuid';
import { compare, hash } from 'bcrypt';
import { verify, sign, decode } from 'jsonwebtoken';
import { CreateJwtParams, JWT } from '../../interfaces/authorization.interface';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CryptoHelper {
  private readonly publicKey: Buffer;
  private readonly privateKey: Buffer;

  constructor(private readonly configService: ConfigService) {
    this.publicKey = readFileSync(
      join(this.configService.get('JWT.publicKey')),
    );
    this.privateKey = readFileSync(join(configService.get('JWT.privateKey')));
  }

  public async hashPassword(plainPassword: string): Promise<string> {
    return hash(plainPassword, 10);
  }

  public async comparePasswords(passwords: {
    plain: string;
    hashed: string;
  }): Promise<boolean> {
    return compare(passwords.plain, passwords.hashed);
  }

  public timeSafeCompare(strings: { first: string; second: string }): boolean {
    return timingSafeEqual(
      Buffer.from(strings.first),
      Buffer.from(strings.second),
    );
  }

  public encodeToBase64(inputString: string): string {
    return Buffer.from(inputString).toString('base64');
  }

  public decodeFromBase64<T>(b64string: string): T {
    return JSON.parse(Buffer.from(b64string, 'base64').toString('ascii')) as T;
  }

  public generateId(): string {
    return v4();
  }

  public generateToken(integer: number): string {
    return randomBytes(integer).toString('hex');
  }

  public hashStringInSha512(inputString: string): string {
    return createHash('sha512').update(inputString).digest('hex');
  }

  public hashStringInMD5(inputString: string): string {
    return createHash('md5').update(inputString).digest('hex');
  }

  public generateJWT({ payload, options }: CreateJwtParams): string {
    return sign(payload, this.privateKey, {
      algorithm: 'RS512',
      expiresIn: options.expiresIn,
    });
  }

  public verifyJWT<T extends unknown>(token: string): T {
    const { header } = decode(token, { complete: true }) as unknown as JWT;

    return verify(token, this.publicKey, {
      algorithms: [header.alg],
    }) as T;
  }
}
