import { CashHistory } from '../model/cash-history.model.js';

export interface CashHistoryRepository {
    saveCashHistory(cash: CashHistory): Promise<CashHistory>;

    findAllByUserId(userId: number): Promise<CashHistory[]>;
}

export const CashHistoryRepository = Symbol('CashHistoryRepository');