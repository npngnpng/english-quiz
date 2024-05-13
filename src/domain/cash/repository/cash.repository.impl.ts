import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../../global/prisma/prisma.client.js';
import { CashRepository } from './cash.repository.js';
import { Cash } from '../model/cash.model.js';

@Injectable()
export class CashRepositoryImpl implements CashRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService
    ) {
    }

    async saveCash(cash: Cash): Promise<Cash> {
        return this.prismaClientService.getClient().cash.create({
            data: {
                reward: cash.reward,
                userId: cash.userId,
                quizId: cash.quizId
            }
        });
    }


}