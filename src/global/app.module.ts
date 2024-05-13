import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from '../domain/user/user.module.js';
import { WordModule } from '../domain/word/word.module.js';
import { QuizModule } from '../domain/quiz/quiz.module.js';
import { AuthModule } from '../domain/auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AdminModule } from './admin/admin.module.js';

@Module({
    imports: [
        AdminModule,
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
