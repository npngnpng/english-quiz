import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserService } from '../service/create-user.service.js';
import { CreateUserRequest } from './dto/user.request.js';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserService: CreateUserService
    ) {
    }

    @HttpCode(201)
    @Post()
    async createUser(@Body() request: CreateUserRequest): Promise<void> {
        await this.createUserService.execute(request);
    }
}