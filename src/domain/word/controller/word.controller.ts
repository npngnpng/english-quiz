import { Body, Controller, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateWordService } from '../service/create-word.service';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../user/model/user.model';
import { CreateWordRequest, UpdateWordRequest } from './dto/word.request';
import { JwtGuard } from '../../../global/auth/guard/jwt.guard';
import { UpdateWordService } from '../service/update-word.service';

@Controller('words')
export class WordController {
    constructor(
        private readonly createWordService: CreateWordService,
        private readonly updateWordService: UpdateWordService
    ) {
    }

    @UseGuards(JwtGuard)
    @HttpCode(201)
    @Post()
    public async createWord(@CurrentUser() currentUser: User, @Body() request: CreateWordRequest): Promise<void> {
        return await this.createWordService.execute(currentUser, request);
    }

    @UseGuards(JwtGuard)
    @HttpCode(204)
    @Put(':id')
    public async updateWord(
        @Param('id') wordId: bigint,
        @Body() request: UpdateWordRequest,
        @CurrentUser() currentUser: User
    ): Promise<void> {
        return this.updateWordService.execute(wordId, request, currentUser);
    }
}