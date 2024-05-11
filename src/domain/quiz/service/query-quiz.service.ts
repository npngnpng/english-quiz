import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../repository/quiz.repository';
import { WordRepository } from '../../word/repository/word.repository';
import { User } from '../../user/model/user.model';
import { QueryQuizResponse } from '../controller/dto/quiz.response';

@Injectable()
export class QueryQuizService {
    constructor(
        @Inject(QuizRepository)
        private readonly quizRepository: QuizRepository,
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository
    ) {
    }

    async execute(wordId: bigint, currentUser: User): Promise<QueryQuizResponse> {
        const word = wordId ?
            await this.wordRepository.findById(wordId) :
            (await this.wordRepository.findRandomWord(currentUser.id))[0];
        if (!word) {
            throw new NotFoundException('Word Not Found');
        }

        const koreans = (await this.wordRepository.findRandomKoreans(currentUser.id, word.korean))
            .map((korean) => korean.korean);
        koreans.push(word.korean);
        koreans.sort(() => Math.random() - 0.5);

        return new QueryQuizResponse(Number(word.id), word.english, koreans);
    }
}