import { Body, Controller, Get, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { QueryMyCashService } from '../service/query-my-cash.service.js';
import { CurrentUser } from '../../../global/decorator/current-user.decorator.js';
import { User } from '../../user/model/user.model.js';
import { JwtGuard } from '../../../global/auth/guard/jwt.guard.js';
import { EarnCashRequest } from './dto/cash.request.js';
import { QueryMyCashResponse } from './dto/cash.response.js';
import { EarnCashService } from '../service/earn-cash.service.js';

@UseGuards(JwtGuard)
@Controller('cash')
export class CashController {
    constructor(
        private readonly queryMyCashService: QueryMyCashService,
        private readonly earnCashService: EarnCashService
    ) {
    }

    @Get()
    async queryMyCash(@CurrentUser() currentUser: User): Promise<QueryMyCashResponse> {
        return await this.queryMyCashService.execute(currentUser);
    }

    @HttpCode(204)
    @Patch()
    async earnCash(@Body() request: EarnCashRequest, @CurrentUser() currentUser: User) {
        await this.earnCashService.execute(request, currentUser);
    }
}
