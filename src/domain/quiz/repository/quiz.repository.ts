import { Quiz } from '../model/quiz.model.js';

export interface QuizRepository {
    saveQuiz(quiz: Quiz): Promise<Quiz>;

    findByWordId(wordId: number): Promise<Quiz>;

    deleteQuiz(wordId: number): Promise<void>;

    updateQuiz(quiz: Quiz): Promise<Quiz>
}

export const QuizRepository = Symbol('QuizRepository');