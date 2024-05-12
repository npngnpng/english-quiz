import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WordRepository } from '../../word/repository/word.repository.js';
import { User } from '../../user/model/user.model.js';
import { QueryQuizResponse } from '../controller/dto/quiz.response.js';

@Injectable()
export class QueryQuizService {
    constructor(
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository
    ) {
    }

    async execute(wordId: number, currentUser: User): Promise<QueryQuizResponse> {
        const word = wordId ?
            await this.wordRepository.findById(wordId) :
            (await this.wordRepository.findRandomWord(currentUser.id, '', 1))[0];
        if (!word) {
            throw new NotFoundException('Word Not Found');
        }

        const koreans = (await this.wordRepository.findRandomWord(currentUser.id, word.korean, 3))
            .map((word) => word.korean);
        koreans.push(word.korean);
        koreans.sort(() => Math.random() - 0.5);

        return new QueryQuizResponse(Number(word.id), word.english, koreans);
    }
}