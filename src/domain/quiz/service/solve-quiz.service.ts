import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../repository/quiz.repository.js';
import { WordRepository } from '../../word/repository/word.repository.js';
import { SolveQuizRequest } from '../controller/dto/quiz.request.js';
import { User } from '../../user/model/user.model.js';
import { Quiz, updateQuiz } from '../model/quiz.model.js';
import { SolveQuizResponse } from '../controller/dto/quiz.response.js';
import { CashRepository } from '../../cash/repository/cash.repository.js';
import { Cash } from '../../cash/model/cash.model.js';

@Injectable()
export class SolveQuizService {
    constructor(
        @Inject(QuizRepository)
        private readonly quizRepository: QuizRepository,
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository,
        @Inject(CashRepository)
        private readonly cashRepository: CashRepository
    ) {
    }

    async execute(wordId: number, request: SolveQuizRequest, currentUser: User): Promise<SolveQuizResponse> {
        const word = await this.wordRepository.findById(wordId);
        const quiz = await this.quizRepository.findByWordId(wordId);
        if (!word) {
            throw new NotFoundException('Word Not Found');
        }
        if (word.userId !== currentUser.id) {
            throw new ForbiddenException('Invalid User');
        }

        const reword = Math.floor(Math.random() * (10 - 1) + 1);
        const isBeforeQuizCorrect = quiz?.isCorrect;
        if (quiz) {
            updateQuiz(quiz, request.choice, request.choice === word.korean);
            await this.quizRepository.updateQuiz(quiz);
            if (!isBeforeQuizCorrect) {
                await this.createCashIfCorrect(request.choice, word.korean, currentUser.id, quiz.id, reword);
            }
        } else {
            const solvedQuiz = await this.quizRepository.saveQuiz(new Quiz(
                word.id,
                currentUser.id,
                request.choice === word.korean,
                request.choice
            ));
            await this.createCashIfCorrect(request.choice, word.korean, currentUser.id, solvedQuiz.id, reword);
        }

        return new SolveQuizResponse(
            request.choice === word.korean,
            request.choice === word.korean && !isBeforeQuizCorrect ? reword : 0
        );
    }

    private async createCashIfCorrect(choice: string, korean: string, userId: number, quizId: number, reword: number) {
        if (choice === korean) {
            await this.cashRepository.saveCash(new Cash(
                reword,
                userId,
                quizId
            ));
        }
    }
}