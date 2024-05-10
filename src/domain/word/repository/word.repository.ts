import { Word } from '../model/word.model';

export interface WordRepository {
    saveWord(word: Word): Promise<Word>;

    findByUserIdAndEnglishAndKorean(userId: bigint, english: string, korean: string): Promise<Word>;

    updateWord(word: Word): Promise<Word>;

    findById(id: bigint): Promise<Word>;
}

export const WordRepository = Symbol('WordRepository');