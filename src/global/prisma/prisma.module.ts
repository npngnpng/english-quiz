import { Global, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma.client.js';
import { TransactionService } from './transaction.service.js';

@Global()
@Module({
    providers: [PrismaClientService, TransactionService],
    exports: [PrismaClientService, TransactionService]
})
export class PrismaModule {
}