export class Quiz {
    id: number;
    wordId: number;
    userId: number;
    isCorrect: boolean;
    choice: string;
    createdAt: Date;


    constructor(wordId: number, userId: number, isCorrect: boolean, choice: string, createdAt?: Date, id?: number) {
        this.id = id;
        this.wordId = wordId;
        this.userId = userId;
        this.isCorrect = isCorrect;
        this.choice = choice;
        this.createdAt = createdAt;
    }
}