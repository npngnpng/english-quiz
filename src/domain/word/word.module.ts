import { Global, Module } from '@nestjs/common';
import { CreateWordService } from './service/create-word.service';
import { WordController } from './controller/word.controller';
import { WordRepository } from './repository/word.repository';
import { WordRepositoryImpl } from './repository/word.repository.impl';
import { UpdateWordService } from './service/update-word.service';

const WORD_REPOSITORY = { provide: WordRepository, useClass: WordRepositoryImpl };

@Module({})
@Module({
    providers: [WORD_REPOSITORY, CreateWordService, UpdateWordService],
    exports: [WORD_REPOSITORY],
    controllers: [WordController]
})
export class WordModule {
}