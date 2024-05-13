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
    reward: number;

    constructor(isCorrect: boolean, reward: number) {
        this.isCorrect = isCorrect;
        this.reward = reward;
    }
}