import { Body, Controller, Delete, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateWordService } from '../service/create-word.service';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../user/model/user.model';
import { CreateWordRequest, UpdateWordRequest } from './dto/word.request';
import { JwtGuard } from '../../../global/auth/guard/jwt.guard';
import { UpdateWordService } from '../service/update-word.service';
import { DeleteWordService } from '../service/delete-word.service';

@Controller('words')
export class WordController {
    constructor(
        private readonly createWordService: CreateWordService,
        private readonly updateWordService: UpdateWordService,
        private readonly deleteWordService: DeleteWordService
    ) {
    }

    @UseGuards(JwtGuard)
    @HttpCode(201)
    @Post()
    public async createWord(@CurrentUser() currentUser: User, @Body() request: CreateWordRequest): Promise<void> {
        await this.createWordService.execute(currentUser, request);
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

    @UseGuards(JwtGuard)
    @HttpCode(204)
    @Delete(':id')
    public async deleteWord(@Param('id') wordId: bigint, @CurrentUser() currentUser: User): Promise<void> {
        await this.deleteWordService.execute(wordId, currentUser);
    }
}