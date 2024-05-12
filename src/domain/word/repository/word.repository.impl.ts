import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../../global/prisma/prisma.client.js';
import { WordRepository } from './word.repository.js';
import { Word } from '../model/word.model.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class WordRepositoryImpl implements WordRepository {
    constructor(
        private readonly prisma: PrismaClientService
    ) {
    }

    async saveWord(word: Word): Promise<Word> {
        return this.prisma.getClient().word.create({
            data: {
                english: word.english,
                korean: word.korean,
                userId: word.userId
            }
        });
    }

    async findByUserIdAndEnglishAndKorean(userId: number, english: string, korean: string): Promise<Word> {
        return this.prisma.getClient().word.findUnique({
            where: {
                english_korean_userId: { english, korean, userId }
            }
        });
    }

    async updateWord(word: Word): Promise<Word> {
        return this.prisma.getClient().word.update({
            where: {
                id: word.id
            },
            data: {
                english: word.english,
                korean: word.korean
            }
        });
    }

    async findById(id: number): Promise<Word> {
        return this.prisma.getClient().word.findUnique({
            where: {
                id: id
            }
        });
    }

    async deleteWord(word: Word): Promise<void> {
        await this.prisma.getClient().word.delete({
            where: {
                id: word.id
            }
        });
    }

    async findAllByUserId(userId: number): Promise<{
        id: number;
        english: string;
        korean: string,
        quiz: { wordId: number, choice: string, createdAt: Date },
    }[]> {
        return this.prisma.getClient().word.findMany({
            select: {
                id: true,
                english: true,
                korean: true,
                quiz: true
            },
            where: {
                userId: userId
            },
            orderBy: {
                english: 'asc'
            }
        });
    }

    async findRandomWord(userId: number, exceptWord: string, limit: number): Promise<Word[]> {
        return this.prisma.getClient().$queryRaw(
            Prisma.sql`
                SELECT id, english, korean, user_id
                FROM word
                WHERE user_id = ${userId}
                  AND korean not in (${exceptWord})
                ORDER BY RAND() LIMIT ${limit}
            `
        );
    }
}