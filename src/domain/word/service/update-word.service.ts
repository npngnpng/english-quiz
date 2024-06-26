import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WordRepository } from '../repository/word.repository.js';
import { UpdateWordRequest } from '../controller/dto/word.request.js';
import { User } from '../../user/model/user.model.js';
import { Word } from '../model/word.model.js';

@Injectable()
export class UpdateWordService {
    constructor(
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository
    ) {
    }

    async execute(wordId: number, request: UpdateWordRequest, currentUser: User) {
        const word = await this.wordRepository.findById(wordId);
        if (!word) {
            throw new NotFoundException('Word Not Found');
        }
        if (word.userId !== currentUser.id) {
            throw new ForbiddenException('Invalid User');
        }
        this.updateWord(word, request.english, request.korean);

        await this.wordRepository.updateWord(word);
    }

    private updateWord(word: Word, english: string, korean: string) {
        word.english = english;
        word.korean = korean;
    }
}