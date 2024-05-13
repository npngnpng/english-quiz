import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository.js';
import { UserRepositoryImpl } from './repository/user.repository.impl.js';
import { CreateUserService } from './service/create-user.service.js';
import { UserController } from './controller/user.controller.js';

const USER_REPOSITORY = { provide: UserRepository, useClass: UserRepositoryImpl };

@Global()
@Module({
    providers: [USER_REPOSITORY, CreateUserService],
    exports: [USER_REPOSITORY],
    controllers: [UserController]
})
export class UserModule {
}