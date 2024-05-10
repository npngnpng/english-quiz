import { Injectable } from '@nestjs/common';
import { PrismaClientService } from './prisma.client';


@Injectable()
export class TransactionService {
    constructor(
        private readonly prisma: PrismaClientService
    ) {
    }

    public async transaction<T>(fn: () => Promise<T>): Promise<T> {
        return this.prisma.$transaction((tx) => {
            this.prisma.setTransaction(tx);
            return fn().finally(() => this.prisma.setTransaction(null));
        });
    }
}