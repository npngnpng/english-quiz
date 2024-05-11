import { Global, Module } from '@nestjs/common';
import { JwtProvider } from '../../global/auth/jwt.provider';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from '../../global/auth/guard/jwt.guard';
import { PrismaTransactionInterceptor } from '../../global/interceptor/prisma-transaction.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordEncoderImpl } from '../../global/auth/password.encoder.impl';
import { PasswordEncoder } from '../../global/auth/password.encoder';
import { LoginService } from './service/login.service';
import { AuthController } from './controller/auth.controller';
import { ReissueService } from './service/reissue.service';

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