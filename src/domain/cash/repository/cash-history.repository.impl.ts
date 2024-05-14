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

    async saveCashHistory(cash: CashHistory): Promise<CashHistory> {
        return this.prismaClientService.getClient().cashHistory.create({
            data: {
                reward: cash.reward,
                userId: cash.userId,
                quizId: cash.quizId
            }
        });
    }

    async findAllByUserId(userId: number): Promise<CashHistory[]> {
        return this.prismaClientService.getClient().cashHistory.findMany({
            where: {
                userId: userId
            }
        });
    }
}