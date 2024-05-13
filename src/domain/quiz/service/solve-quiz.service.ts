import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../repository/quiz.repository.js';
import { WordRepository } from '../../word/repository/word.repository.js';
import { SolveQuizRequest } from '../controller/dto/quiz.request.js';
import { User } from '../../user/model/user.model.js';
import { Quiz } from '../model/quiz.model.js';
import { SolveQuizResponse } from '../controller/dto/quiz.response.js';

@Injectable()
export class SolveQuizService {
    constructor(
        @Inject(QuizRepository)
        private readonly quizRepository: QuizRepository,
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository
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
        if (quiz) {
            if (quiz.choice == word.korean) {
                throw new ConflictException('Already Correct Quiz');
            } else {
                console.log('here');
                await this.quizRepository.deleteQuiz(wordId);
            }
        }

        await this.quizRepository.saveQuiz(new Quiz(
            word.id,
            currentUser.id,
            request.choice === word.korean,
            request.choice
        ));

        return new SolveQuizResponse(request.choice === word.korean, word.korean);
    }
}