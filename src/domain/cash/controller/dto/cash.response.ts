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