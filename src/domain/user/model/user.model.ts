export class User {
    id: bigint;
    name: string;
    accountId: string;
    password: string;


    constructor(name: string, accountId: string, password: string, id?: bigint) {
        this.id = id ? id : BigInt(0);
        this.name = name;
        this.accountId = accountId;
        this.password = password;
    }
}