import { Body, Controller, Headers, Post, Put } from '@nestjs/common';
import { LoginService } from '../service/login.service.js';
import { TokenResponse } from '../../user/controller/dto/user.response.js';
import { LoginRequest } from './dto/auth.request.js';
import { ReissueService } from '../service/reissue.service.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService: LoginService,
        private readonly reissueService: ReissueService
    ) {
    }

    @Post()
    async login(@Body() request: LoginRequest): Promise<TokenResponse> {
        return await this.loginService.execute(request);
    }

    @Put()
    async reissue(@Headers('X-Refresh-Token') refreshToken: string): Promise<TokenResponse> {
        return await this.reissueService.execute(refreshToken);
    }
}