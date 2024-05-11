import { Injectable } from '@nestjs/common';
import { QuizRepository } from './quiz.repository';
import { PrismaClientService } from '../../../global/prisma/prisma.client';
import { Quiz } from '../model/quiz.model';

@Injectable()
export class QuizRepositoryImpl implements QuizRepository {
    constructor(
        private readonly prisma: PrismaClientService
    ) {
    }

    async saveQuiz(quiz: Quiz): Promise<Quiz> {
        return this.prisma.getClient().quiz.create({
            data: {
                wordId: quiz.wordId,
                choice: quiz.choice
            }
        });
    }

    async findByWordId(wordId: bigint): Promise<Quiz> {
        return this.prisma.getClient().quiz.findUnique({
            where: {
                wordId: wordId
            }
        });
    }

    async deleteQuiz(wordId: bigint): Promise<void> {
        await this.prisma.getClient().quiz.delete({
            where: {
                wordId: wordId
            }
        });
    }
}