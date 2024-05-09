import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserRepositoryImpl } from './repository/user.repository.impl';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './service/create-user.service';
import { LoginService } from './service/login.service';

const USER_REPOSITORY = { provide: UserRepository, useClass: UserRepositoryImpl };

@Module({
    providers: [USER_REPOSITORY, CreateUserService, LoginService],
    exports: [USER_REPOSITORY],
    controllers: [UserController]
})
export class UserModule {
}