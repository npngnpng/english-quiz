import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { lastValueFrom, Observable, of } from 'rxjs';
import { TransactionService } from '../prisma/transaction.service';

@Injectable()
export class PrismaTransactionInterceptor implements NestInterceptor {
    constructor(
        private readonly transactionService: TransactionService
    ) {
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        return this.transactionService.transaction(async () => {
            return of(await lastValueFrom(next.handle()));
        });
    }
}