import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserService } from '../service/create-user.service';
import { CreateUserRequest, LoginRequest } from './dto/user.request';
import { LoginService } from '../service/login.service';
import { LoginResponse } from './dto/user.response';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly loginService: LoginService
    ) {
    }

    @HttpCode(201)
    @Post()
    async createUser(@Body() request: CreateUserRequest): Promise<void> {
        await this.createUserService.execute(request);
    }

    @Post('login')
    async login(@Body() request: LoginRequest): Promise<LoginResponse> {
        return await this.loginService.execute(request);
    }
}