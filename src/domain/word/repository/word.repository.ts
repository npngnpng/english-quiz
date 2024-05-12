import { Word } from '../model/word.model.js';

export interface WordRepository {
    saveWord(word: Word): Promise<Word>;

    findByUserIdAndEnglishAndKorean(userId: number, english: string, korean: string): Promise<Word>;

    updateWord(word: Word): Promise<Word>;

    findById(id: number): Promise<Word>;

    deleteWord(word: Word): Promise<void>;

    findAllByUserId(userId: number): Promise<{
        id: number;
        english: string;
        korean: string,
        quiz: { wordId: number, choice: string, createdAt: Date },
    }[]>;

    findRandomWord(userId: number, exceptKorean: string, limit: number): Promise<Word[]>
}

export const WordRepository = Symbol('WordRepository');