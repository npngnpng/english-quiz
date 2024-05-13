import { Module } from '@nestjs/common';
import { QuizRepository } from './repository/quiz.repository.js';
import { QuizRepositoryImpl } from './repository/quiz.repository.impl.js';
import { QuizController } from './controller/quiz.controller.js';
import { SolveQuizService } from './service/solve-quiz.service.js';
import { QueryQuizService } from './service/query-quiz.service.js';

const QUIZ_REPOSITORY = { provide: QuizRepository, useClass: QuizRepositoryImpl };

@Module({
    providers: [QUIZ_REPOSITORY, SolveQuizService, QueryQuizService],
    exports: [QUIZ_REPOSITORY],
    controllers: [QuizController]
})
export class QuizModule {
}