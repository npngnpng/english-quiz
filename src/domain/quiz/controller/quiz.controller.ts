import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../global/auth/guard/jwt.guard.js';
import { SolveQuizRequest } from './dto/quiz.request.js';
import { CurrentUser } from '../../../global/decorator/current-user.decorator.js';
import { User } from '../../user/model/user.model.js';
import { SolveQuizService } from '../service/solve-quiz.service.js';
import { QueryQuizService } from '../service/query-quiz.service.js';
import { SolveQuizResponse } from './dto/quiz.response.js';

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
        @Param('wordId', ParseIntPipe) wordId: number,
        @Body() request: SolveQuizRequest,
        @CurrentUser() currentUser: User
    ): Promise<SolveQuizResponse> {
        return await this.createQuizService.execute(wordId, request, currentUser);
    }

    @Get()
    async queryQuiz(
        @Query('word_id') wordId: number,
        @CurrentUser() currentUser: User
    ) {
        return await this.queryQuizService.execute(wordId, currentUser);
    }
}