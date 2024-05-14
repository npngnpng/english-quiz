import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../../global/prisma/prisma.client.js';
import { CashHistoryRepository } from './cash-history.repository.js';
import { CashHistory } from '../model/cash-history.model.js';

@Injectable()
export class CashHistoryRepositoryImpl implements CashHistoryRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService
    ) {
    }

    async saveCashHistory(cashHistory: CashHistory): Promise<CashHistory> {
        return this.prismaClientService.getClient().cashHistory.create({
            data: {
                reward: cashHistory.reward,
                userId: cashHistory.userId,
                quizId: cashHistory.quizId
            }
        });
    }

    async findAllByUserId(userId: number): Promise<{quiz: {word: {english: string}}, reward: number, createdAt: Date}[]> {
        return this.prismaClientService.getClient().cashHistory.findMany({
            select: {
                reward: true,
                createdAt: true,
                quiz: {
                    select: {
                        word: {
                            select: {
                                english: true
                            }
                        }
                    }
                }
            },
            where: {
                userId: userId
            }
        });
    }
}