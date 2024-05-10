export class Quiz {
    wordId: bigint;
    choice: string;
    createdAt: Date;
    
    constructor(wordId: bigint, choice: string, createdAt?: Date) {
        this.wordId = wordId;
        this.choice = choice;
        this.createdAt = createdAt;
    }
}