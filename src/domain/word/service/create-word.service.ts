import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { WordRepository } from '../repository/word.repository.js';
import { User } from '../../user/model/user.model.js';
import { CreateWordRequest } from '../controller/dto/word.request.js';
import { Word } from '../model/word.model.js';

@Injectable()
export class CreateWordService {
    constructor(
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository
    ) {
    }

    async execute(currentUser: User, request: CreateWordRequest) {
        if (await this.wordRepository.findByUserIdAndEnglishAndKorean(
            currentUser.id,
            request.english,
            request.korean
        )) {
            throw new ConflictException('Word Already Exists');
        }

        await this.wordRepository.saveWord(new Word(
            request.english,
            request.korean,
            currentUser.id
        ));
    }
}