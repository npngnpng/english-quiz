import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: ['error', 'info', 'query', 'warn']
        });
    }

    transactionClient: Omit<PrismaClient, runtime.ITXClientDenyList>;

    async onModuleInit() {
        await this.$connect();
    }

    setTransaction(transaction: Omit<PrismaClient, runtime.ITXClientDenyList>) {
        this.transactionClient = transaction;
    }

    getClient() {
        return (
            this.transactionClient ??
            this
        );
    }
}