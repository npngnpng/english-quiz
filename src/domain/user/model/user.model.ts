export class User {
    id: number;
    name: string;
    accountId: string;
    password: string;


    constructor(name: string, accountId: string, password: string, id?: number) {
        this.id = id ? id : 0;
        this.name = name;
        this.accountId = accountId;
        this.password = password;
    }
}