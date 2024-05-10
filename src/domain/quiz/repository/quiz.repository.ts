import { Quiz } from '../model/quiz.model';

export interface QuizRepository {
    saveQuiz(quiz: Quiz): Promise<Quiz>;

    findByWordId(wordId: bigint): Promise<Quiz>;

    deleteQuiz(wordId: bigint): Promise<void>;
}

export const QuizRepository = Symbol('QuizRepository');