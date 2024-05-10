import { Global, Module } from '@nestjs/common';
import { JwtProvider } from './jwt.provider';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { JwtGuard } from './guard/jwt.guard';

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
    providers: [JwtProvider, PasswordService, JwtGuard],
    exports: [JwtProvider, PasswordService, JwtGuard]
})
export class AuthModule {

}