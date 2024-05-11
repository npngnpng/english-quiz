import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../global/auth/guard/jwt.guard';
import { SolveQuizRequest } from './dto/quiz.request';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../user/model/user.model';
import { SolveQuizService } from '../service/solve-quiz.service';
import { QueryQuizService } from '../service/query-quiz.service';
import { SolveQuizResponse } from './dto/quiz.response';

@UseGuards(JwtGuard)
@Controller('quiz')
export class QuizController {
    constructor(
        private readonly createQuizService: SolveQuizService,
        private readonly queryQuizService: QueryQuizService
    ) {
    }

    @HttpCode(201)
    @Post(':wordId')
    async createQuiz(
        @Param('wordId') wordId: bigint,
        @Body() request: SolveQuizRequest,
        @CurrentUser() currentUser: User
    ): Promise<SolveQuizResponse> {
        return await this.createQuizService.execute(wordId, request, currentUser);
    }

    @Get()
    async queryQuiz(
        @Query('word_id') wordId: bigint,
        @CurrentUser() currentUser: User
    ) {
        return await this.queryQuizService.execute(wordId, currentUser);
    }
}