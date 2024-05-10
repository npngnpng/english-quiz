import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../../global/prisma/prisma.client';
import { WordRepository } from './word.repository';
import { Word } from '../model/word.model';
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

    async findByUserIdAndEnglishAndKorean(userId: bigint, english: string, korean: string): Promise<Word> {
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

    async findById(id: bigint): Promise<Word> {
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

    async findAllByUserId(userId: bigint): Promise<{
        id: bigint;
        english: string;
        korean: string,
        quiz: { wordId: bigint, choice: string, createdAt: Date },
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

    async findRandomWord(userId: bigint): Promise<Word[]> {
        return this.prisma.getClient().$queryRaw(
            Prisma.sql`
                SELECT id, english, korean, user_id
                FROM word
                         LEFT JOIN quiz on word.id = quiz.word_id
                WHERE user_id = ${userId}
                  AND quiz.word_id is null
                ORDER BY RAND() LIMIT 1
            `
        );
    }

    async findRandomKoreans(userId: bigint, exceptWord: string): Promise<{ korean: string }[]> {
        return this.prisma.getClient().$queryRaw(
            Prisma.sql`
                SELECT korean
                FROM word
                         LEFT JOIN quiz on word.id = quiz.word_id
                WHERE user_id = ${userId}
                  AND korean not in (${exceptWord})
                ORDER BY RAND() LIMIT 3
            `
        );
    }
}