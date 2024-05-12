import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateWordService } from '../service/create-word.service.js';
import { CurrentUser } from '../../../global/decorator/current-user.decorator.js';
import { User } from '../../user/model/user.model.js';
import { CreateWordRequest, UpdateWordRequest } from './dto/word.request.js';
import { JwtGuard } from '../../../global/auth/guard/jwt.guard.js';
import { UpdateWordService } from '../service/update-word.service.js';
import { DeleteWordService } from '../service/delete-word.service.js';
import { QueryWordsService } from '../service/query-words.service.js';
import { QueryWordsResponse } from './dto/word.response.js';

@UseGuards(JwtGuard)
@Controller('words')
export class WordController {
    constructor(
        private readonly createWordService: CreateWordService,
        private readonly updateWordService: UpdateWordService,
        private readonly deleteWordService: DeleteWordService,
        private readonly queryWordsService: QueryWordsService
    ) {
    }

    @HttpCode(201)
    @Post()
    async createWord(@CurrentUser() currentUser: User, @Body() request: CreateWordRequest): Promise<void> {
        await this.createWordService.execute(currentUser, request);
    }

    @HttpCode(204)
    @Put(':id')
    async updateWord(
        @Param('id', ParseIntPipe) wordId: number,
        @Body() request: UpdateWordRequest,
        @CurrentUser() currentUser: User
    ): Promise<void> {
        return this.updateWordService.execute(wordId, request, currentUser);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteWord(@Param('id', ParseIntPipe) wordId: number, @CurrentUser() currentUser: User): Promise<void> {
        await this.deleteWordService.execute(wordId, currentUser);
    }

    @Get()
    async queryWords(@CurrentUser() currentUser: User): Promise<QueryWordsResponse> {
        return await this.queryWordsService.execute(currentUser);
    }
}