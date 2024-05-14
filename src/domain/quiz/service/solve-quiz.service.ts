import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../repository/quiz.repository.js';
import { WordRepository } from '../../word/repository/word.repository.js';
import { SolveQuizRequest } from '../controller/dto/quiz.request.js';
import { User } from '../../user/model/user.model.js';
import { Quiz, updateQuiz } from '../model/quiz.model.js';
import { SolveQuizResponse } from '../controller/dto/quiz.response.js';
import { CashHistoryRepository } from '../../cash/repository/cash-history.repository.js';
import { CashHistory } from '../../cash/model/cash-history.model.js';
import { CashRepository } from '../../cash/repository/cash.repository.js';
import { addUnaccountedCash, Cash, getReward } from '../../cash/model/cash.model.js';

@Injectable()
export class SolveQuizService {
    constructor(
        @Inject(QuizRepository)
        private readonly quizRepository: QuizRepository,
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository,
        @Inject(CashHistoryRepository)
        private readonly cashHistoryRepository: CashHistoryRepository,
        @Inject(CashRepository)
        private readonly cashRepository: CashRepository
    ) {
    }

    async execute(wordId: number, request: SolveQuizRequest, currentUser: User): Promise<SolveQuizResponse> {
        const word = await this.wordRepository.findById(wordId);
        const quiz = await this.quizRepository.findByWordId(wordId);
        const cash = await this.cashRepository.findByUserId(currentUser.id);
        if (!word) {
            throw new NotFoundException('Word Not Found');
        }
        if (word.userId !== currentUser.id) {
            throw new ForbiddenException('Invalid User');
        }

        const reword = getReward(cash);
        const isBeforeQuizCorrect = quiz?.isCorrect;
        if (quiz) {
            if (!isBeforeQuizCorrect) {
                await this.addCashIfCorrect(request.choice, word.korean, currentUser.id, quiz.id, reword, cash);
                updateQuiz(quiz, request.choice, request.choice === word.korean);
            }
            await this.quizRepository.updateQuiz(quiz);
        } else {
            const solvedQuiz = await this.quizRepository.saveQuiz(new Quiz(
                word.id,
                currentUser.id,
                request.choice === word.korean,
                request.choice
            ));
            await this.addCashIfCorrect(request.choice, word.korean, currentUser.id, solvedQuiz.id, reword, cash);
        }

        return new SolveQuizResponse(
            request.choice === word.korean,
            request.choice === word.korean && !isBeforeQuizCorrect ? reword : 0
        );
    }

    private async addCashIfCorrect(
        choice: string,
        korean: string,
        userId: number,
        quizId: number,
        reward: number,
        cash: Cash
    ) {
        if (choice === korean && reward != 0) {
            await this.cashHistoryRepository.saveCashHistory(new CashHistory(
                reward,
                userId,
                quizId
            ));
            addUnaccountedCash(cash, reward);
            await this.cashRepository.updateCash(cash);
        }
    }
}