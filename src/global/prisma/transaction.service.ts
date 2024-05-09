import { Injectable } from '@nestjs/common';
import { PrismaClientService } from './prisma.client';
import { PrismaClient } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import * as runtime from '@prisma/client/runtime/library';


@Injectable()
export class TransactionService {
    constructor(
        private readonly prisma: PrismaClientService
    ) {
    }

    public async transaction<T>(fn: () => Promise<T>): Promise<T> {
        return this.prisma.$transaction((tx) => {
            this.prisma.setTransaction(tx)
            return fn();
        });
    }
}