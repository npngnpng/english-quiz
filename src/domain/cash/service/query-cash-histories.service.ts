import { Inject, Injectable } from '@nestjs/common';
import { CashHistoryRepository } from '../repository/cash-history.repository.js';
import { User } from '../../user/model/user.model.js';
import { QueryCashHistoriesResponse } from '../controller/dto/cash.response.js';

@Injectable()
export class QueryCashHistoriesService {
    constructor(
        @Inject(CashHistoryRepository)
        private readonly cashHistoryRepository: CashHistoryRepository
    ) {
    }

    async execute(currentUser: User): Promise<QueryCashHistoriesResponse> {
        const cashHistories = await this.cashHistoryRepository.findAllByUserId(currentUser.id);
        return new QueryCashHistoriesResponse(cashHistories.map((cashHistory) => ({
            reward: cashHistory.reward,
            createdAt: cashHistory.createdAt,
            quiz: cashHistory.quiz.word.english
        })));
    }
}