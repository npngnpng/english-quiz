import { Cash } from '../model/cash.model.js';

export interface CashRepository {
    saveCash(cash: Cash): Promise<Cash>;

    findByUserId(userId: number): Promise<Cash>;

    updateCash(cash: Cash): Promise<Cash>;
}

export const CashRepository = Symbol('CashRepository');