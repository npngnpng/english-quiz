import { Cash } from '../model/cash.model.js';
import { CashRepository } from './cash.repository.js';
import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../../global/prisma/prisma.client.js';

@Injectable()
export class CashRepositoryImpl implements CashRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService
    ) {
    }

    async saveCash(cash: Cash): Promise<Cash> {
        return this.prismaClientService.getClient().cash.create({
            data: {
                userId: cash.userId
            }
        });
    }

    async findByUserId(userId: number): Promise<Cash> {
        return this.prismaClientService.getClient().cash.findUnique({
            where: {
                userId: userId
            }
        });
    }

    async updateCash(cash: Cash): Promise<Cash> {
        return this.prismaClientService.getClient().cash.update({
            where: {
                id: cash.id
            },
            data: {
                cash: cash.cash,
                unaccountedCash: cash.unaccountedCash
            }
        });
    }
}