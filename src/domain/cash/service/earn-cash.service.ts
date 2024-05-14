import { Inject, Injectable } from '@nestjs/common';
import { CashRepository } from '../repository/cash.repository.js';
import { User } from '../../user/model/user.model.js';
import { addCash } from '../model/cash.model.js';
import { EarnCashRequest } from '../controller/dto/cash.request.js';

@Injectable()
export class EarnCashService {
    constructor(
        @Inject(CashRepository)
        private readonly cashRepository: CashRepository
    ) {
    }

    async execute(request: EarnCashRequest, currentUser: User) {
        const cash = await this.cashRepository.findByUserId(currentUser.id);
        addCash(cash, request.earnCash);
        await this.cashRepository.updateCash(cash)
    }
}