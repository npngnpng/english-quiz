import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtProvider } from '../../global/auth/jwt.provider.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaTransactionInterceptor } from '../../global/interceptor/prisma-transaction.interceptor.js';
import { PasswordEncoderImpl } from '../../global/auth/password.encoder.impl.js';
import { PasswordEncoder } from '../../global/auth/password.encoder.js';
import { JwtGuard } from '../../global/auth/guard/jwt.guard.js';
import { LoginService } from './service/login.service.js';
import { ReissueService } from './service/reissue.service.js';
import { AuthController } from './controller/auth.controller.js';

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
    providers: [
        JwtProvider,
        PASSWORD_ENCODER,
        JwtGuard,
        GLOBAL_INTERCEPTOR,
        LoginService,
        ReissueService
    ],
    exports: [JwtProvider, PASSWORD_ENCODER, JwtGuard],
    controllers: [AuthController]
})
export class AuthModule {

}