import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../../global/prisma/prisma.client';
import { WordRepository } from './word.repository';
import { Word } from '../model/word.model';

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

    deleteWord(word: Word): Promise<Word> {
        return this.prisma.getClient().word.delete({
            where: {
                id: word.id
            }
        });
    }

    findAllByUserId(userId: bigint): Promise<{
        id: bigint;
        english: string;
        korean: string,
        quiz: { wordId: bigint, choice: string, createAt: Date },
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


}