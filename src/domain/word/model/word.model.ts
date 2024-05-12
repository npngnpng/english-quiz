export class Word {
    id: number;
    english: string;
    korean: string;
    userId: number;

    constructor(english: string, korean: string, userId: number, id?: number) {
        this.id = id ? id : 0;
        this.english = english;
        this.korean = korean;
        this.userId = userId;
    }
}

