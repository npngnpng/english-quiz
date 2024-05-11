import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from '../domain/user/user.module';
import { WordModule } from '../domain/word/word.module';
import { QuizModule } from '../domain/quiz/quiz.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from '../domain/auth/auth.module';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        WordModule,
        QuizModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        CacheModule.register({
            isGlobal: true
        })
    ]
})
export class AppModule {
}
