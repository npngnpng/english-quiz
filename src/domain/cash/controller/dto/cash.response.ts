export class QueryMyCashResponse {
    cash: number;
    unaccountedCash: number;
    todayCash: number;

    constructor(cash: number, unaccountedCash: number, todayCash: number) {
        this.cash = cash;
        this.unaccountedCash = unaccountedCash;
        this.todayCash = todayCash;
    }
}

export class QueryCashHistoriesResponse {
    cashHistories: { reward: number, quiz: string, createdAt: Date }[];

    constructor(cashHistories: { reward: number; quiz: string; createdAt: Date }[]) {
        this.cashHistories = cashHistories;
    }
}