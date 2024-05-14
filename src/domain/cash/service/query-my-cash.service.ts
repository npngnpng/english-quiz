import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/model/user.model.js';
import { QueryMyCashResponse } from '../controller/dto/cash.response.js';
import { CashRepository } from '../repository/cash.repository.js';

@Injectable()
export class QueryMyCashService {
    constructor(
        @Inject(CashRepository)
        private readonly cashRepository: CashRepository
    ) {
    }

    async execute(currentUser: User): Promise<QueryMyCashResponse> {
        const cash = await this.cashRepository.findByUserId(currentUser.id);
        return new QueryMyCashResponse(cash.cash, cash.unaccountedCash, cash.todayCash);
    }
}