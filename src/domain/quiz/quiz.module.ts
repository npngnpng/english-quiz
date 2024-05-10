import { Module } from '@nestjs/common';
import { QuizRepository } from './repository/quiz.repository';
import { QuizRepositoryImpl } from './repository/quiz.repository.impl';
import { QuizController } from './controller/quiz.controller';
import { SolveQuizService } from './service/solve-quiz.service';
import { QueryQuizService } from './service/query-quiz.service';

const QUIZ_REPOSITORY = { provide: QuizRepository, useClass: QuizRepositoryImpl };

@Module({
    providers: [QUIZ_REPOSITORY, SolveQuizService, QueryQuizService],
    exports: [QUIZ_REPOSITORY],
    controllers: [QuizController]
})
export class QuizModule {
}