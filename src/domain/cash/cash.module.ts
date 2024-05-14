import { Global, Module } from '@nestjs/common';
import { CashHistoryRepository } from './repository/cash-history.repository.js';
import { CashHistoryRepositoryImpl } from './repository/cash-history.repository.impl.js';
import { CashRepository } from './repository/cash.repository.js';
import { CashRepositoryImpl } from './repository/cash.repository.impl.js';
import { CashController } from './controller/cash.controller.js';
import { QueryMyCashService } from './service/query-my-cash.service.js';
import { EarnCashService } from './service/earn-cash.service.js';

const CASH_HISTORY_REPOSITORY = { provide: CashHistoryRepository, useClass: CashHistoryRepositoryImpl };
const CASH_REPOSITORY = { provide: CashRepository, useClass: CashRepositoryImpl };

@Global()
@Module({
    providers: [
        CASH_REPOSITORY,
        CASH_HISTORY_REPOSITORY,
        QueryMyCashService,
        EarnCashService
    ],
    exports: [CASH_REPOSITORY, CASH_HISTORY_REPOSITORY],
    controllers: [CashController]
})
export class CashModule {

}