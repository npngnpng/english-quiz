export class Word {
    id: bigint;
    english: string;
    korean: string;
    userId: bigint;

    constructor(english: string, korean: string, userId: bigint, id?: bigint) {
        this.id = id ? id : BigInt(0);
        this.english = english;
        this.korean = korean;
        this.userId = userId;
    }
}

