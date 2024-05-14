export class CashHistory {
    id: number;
    reward: number;
    userId: number;
    quizId: number;


    constructor(reward: number, userId: number, quizId: number, id?: number) {
        this.id = id;
        this.reward = reward;
        this.userId = userId;
        this.quizId = quizId;
    }
}