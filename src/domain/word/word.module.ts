import { Global, Module } from '@nestjs/common';
import { CreateWordService } from './service/create-word.service.js';
import { WordController } from './controller/word.controller.js';
import { WordRepository } from './repository/word.repository.js';
import { WordRepositoryImpl } from './repository/word.repository.impl.js';
import { UpdateWordService } from './service/update-word.service.js';
import { DeleteWordService } from './service/delete-word.service.js';
import { QueryWordsService } from './service/query-words.service.js';

const WORD_REPOSITORY = { provide: WordRepository, useClass: WordRepositoryImpl };

@Global()
@Module({
    providers: [
        WORD_REPOSITORY,
        CreateWordService,
        UpdateWordService,
        DeleteWordService,
        QueryWordsService
    ],
    exports: [WORD_REPOSITORY],
    controllers: [WordController]
})
export class WordModule {
}