import { Global, Module } from '@nestjs/common';
import { CashRepository } from './repository/cash.repository.js';
import { CashRepositoryImpl } from './repository/cash.repository.impl.js';

const CASH_REPOSITORY = { provide: CashRepository, useClass: CashRepositoryImpl };

@Global()
@Module({
    providers: [CASH_REPOSITORY],
    exports: [CASH_REPOSITORY]
})
export class CashModule {

}