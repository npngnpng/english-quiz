import { Global, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma.client';
import { TransactionService } from './transaction.service';

@Global()
@Module({
    providers: [PrismaClientService, TransactionService],
    exports: [PrismaClientService, TransactionService]
})
export class PrismaModule {
}