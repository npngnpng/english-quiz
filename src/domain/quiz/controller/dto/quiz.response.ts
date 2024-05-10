export class QueryQuizResponse {
    wordId: number;
    english: string;
    koreans: string[];

    constructor(wordId: number, english: string, koreans: string[]) {
        this.wordId = wordId;
        this.english = english;
        this.koreans = koreans;
    }
}

export class SolveQuizResponse {
    isCorrect: boolean;
    answer: string;

    constructor(isCorrect: boolean, answer: string) {
        this.isCorrect = isCorrect;
        this.answer = answer;
    }
}