import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from '../domain/user/user.module';
import { WordModule } from '../domain/word/word.module';
import { QuizModule } from '../domain/quiz/quiz.module';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        WordModule,
        QuizModule,
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
