import { Inject, Injectable } from '@nestjs/common';
import { WordRepository } from '../repository/word.repository';
import { User } from '../../user/model/user.model';
import { QueryWordsResponse, WordResponse } from '../controller/dto/word.response';

@Injectable()
export class QueryWordsService {
    constructor(
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository
    ) {
    }

    public async execute(currentUser: User): Promise<QueryWordsResponse> {
        return new QueryWordsResponse(
            (await this.wordRepository.findAllByUserId(currentUser.id)).map((word) => {
                return new WordResponse(
                    Number(word.id),
                    word.english,
                    word.korean,
                    word.quiz ? {
                        isCorrect: word.quiz.choice === word.korean,
                        createAt: word.quiz.createAt
                    } : null
                );
            })
        );
    }
}