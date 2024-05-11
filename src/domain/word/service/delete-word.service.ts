import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WordRepository } from '../repository/word.repository';
import { User } from '../../user/model/user.model';

@Injectable()
export class DeleteWordService {
    constructor(
        @Inject(WordRepository)
        private readonly wordRepository: WordRepository
    ) {
    }

    async execute(wordId: bigint, currentUser: User) {
        const word = await this.wordRepository.findById(wordId);
        if (!word) {
            throw new NotFoundException('Word Not Found');
        }
        if (word.userId !== currentUser.id) {
            throw new ForbiddenException('Invalid User');
        }

        await this.wordRepository.deleteWord(word);
    }
}