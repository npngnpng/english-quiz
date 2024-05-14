import { CashHistory } from '../model/cash-history.model.js';

export interface CashHistoryRepository {
    saveCashHistory(cashHistory: CashHistory): Promise<CashHistory>;

    findAllByUserId(userId: number): Promise<{ quiz: { word: { english: string } }, reward: number, createdAt: Date }[]>;
}

export const CashHistoryRepository = Symbol('CashHistoryRepository');