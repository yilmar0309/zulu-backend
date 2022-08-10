import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationGuard } from './common/guards/authentication/authentication.guard';
import { CommonHelpersModule } from './common/helpers/common-helpers.module';
import { CommonServiceModule } from './common/services/common-service.module';
import configurations from './config/configurations';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('connectDatabase'),
      }),
      inject: [ConfigService, PinoLogger],
    }),
    LoggerModule.forRootAsync({
      providers: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          pinoHttp: {
            level: configService.get('logger.level'),
            prettyPrint: {
              levelFirst: true,
              colorize: true,
              translateTime: true,
              singleLine: true,
            },
          },
          exclude: configService.get('logger.log.requests') ? [] : ['/(.*)'],
        };
      },
    }),
    CommonHelpersModule,
    CommonServiceModule,
    AuthModule,
    UsersModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
