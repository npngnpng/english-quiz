import { ConflictException } from '@nestjs/common';

export class Cash {
    id: number;
    userId: number;
    cash: number;
    unaccountedCash: number;
    todayCash: number;

    constructor(userId: number, cash?: number, unaccountedCash?: number, id?: number, todayCash?: number) {
        this.id = id;
        this.userId = userId;
        this.cash = cash;
        this.unaccountedCash = unaccountedCash;
        this.todayCash = todayCash;
    }
}

export function addUnaccountedCash(cash: Cash, reward: number) {
    cash.unaccountedCash += reward;
    cash.todayCash += reward;
}

export function addCash(cash: Cash, earnCash: number) {
    if (cash.unaccountedCash - earnCash < 0) {
        throw new ConflictException('Insufficient UnaccountedCash');
    }
    cash.unaccountedCash -= earnCash;
    cash.cash += earnCash;
}

export function getReward(cash: Cash) {
    if (cash.todayCash >= 100) {
        return 0;
    }
    return Math.floor((99 - cash.todayCash + 10) / 10);
}