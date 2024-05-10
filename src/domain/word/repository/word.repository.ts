import { Word } from '../model/word.model';

export interface WordRepository {
    saveWord(word: Word): Promise<Word>;

    findByUserIdAndEnglishAndKorean(userId: bigint, english: string, korean: string): Promise<Word>;

    updateWord(word: Word): Promise<Word>;

    findById(id: bigint): Promise<Word>;

    deleteWord(word: Word): Promise<void>;

    findAllByUserId(userId: bigint): Promise<{
        id: bigint;
        english: string;
        korean: string,
        quiz: { wordId: bigint, choice: string, createdAt: Date },
    }[]>;

    findRandomWord(userId: bigint): Promise<Word[]>;

    findRandomKoreans(userId: bigint, exceptWord: string): Promise<{ korean: string }[]>;
}

export const WordRepository = Symbol('WordRepository');