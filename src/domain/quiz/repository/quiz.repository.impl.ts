import { Injectable } from '@nestjs/common';
import { QuizRepository } from './quiz.repository.js';
import { PrismaClientService } from '../../../global/prisma/prisma.client.js';
import { Quiz } from '../model/quiz.model.js';

@Injectable()
export class QuizRepositoryImpl implements QuizRepository {
    constructor(
        private readonly prisma: PrismaClientService
    ) {
    }

    async saveQuiz(quiz: Quiz): Promise<Quiz> {
        return this.prisma.getClient().quiz.create({
            data: {
                userId: quiz.userId,
                wordId: quiz.wordId,
                isCorrect: quiz.isCorrect,
                choice: quiz.choice
            }
        });
    }

    async findByWordId(wordId: number): Promise<Quiz> {
        return this.prisma.getClient().quiz.findUnique({
            where: {
                wordId: wordId
            }
        });
    }

    async deleteQuiz(wordId: number): Promise<void> {
        await this.prisma.getClient().quiz.delete({
            where: {
                wordId: wordId
            }
        });
    }

    async updateQuiz(quiz: Quiz): Promise<Quiz> {
        return this.prisma.getClient().quiz.update({
            where: {
                id: quiz.id
            },
            data: {
                choice: quiz.choice,
                isCorrect: quiz.isCorrect
            }
        });
    }
}