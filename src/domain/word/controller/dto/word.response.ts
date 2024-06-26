export class WordResponse {
    id: number;
    english: string;
    korean: string;
    quiz: { isCorrect: boolean, createdAt: Date };

    constructor(id: number, english: string, korean: string, quiz?: { isCorrect: boolean; createdAt: Date }) {
        this.id = id;
        this.english = english;
        this.korean = korean;
        this.quiz = quiz;
    }
}

export class QueryWordsResponse {
    words: WordResponse[];

    constructor(words: WordResponse[]) {
        this.words = words;
    }
}