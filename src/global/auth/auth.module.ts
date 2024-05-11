import { Global, Module } from '@nestjs/common';
import { JwtProvider } from './jwt.provider';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { PrismaTransactionInterceptor } from '../interceptor/prisma-transaction.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordEncoderImpl } from './password.encoder.impl';
import { PasswordEncoder } from './password.encoder';

const GLOBAL_INTERCEPTOR = { provide: APP_INTERCEPTOR, useClass: PrismaTransactionInterceptor };
const PASSWORD_ENCODER = { provide: PasswordEncoder, useClass: PasswordEncoderImpl };

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET')
            })
        })
    ],
    providers: [JwtProvider, PASSWORD_ENCODER, JwtGuard, GLOBAL_INTERCEPTOR],
    exports: [JwtProvider, PASSWORD_ENCODER, JwtGuard]
})
export class AuthModule {

}