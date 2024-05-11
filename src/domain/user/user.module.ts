import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserRepositoryImpl } from './repository/user.repository.impl';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './service/create-user.service';

const USER_REPOSITORY = { provide: UserRepository, useClass: UserRepositoryImpl };

@Global()
@Module({
    providers: [USER_REPOSITORY, CreateUserService],
    exports: [USER_REPOSITORY],
    controllers: [UserController]
})
export class UserModule {
}