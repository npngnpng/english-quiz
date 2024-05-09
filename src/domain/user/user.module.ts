import { Module } from '@nestjs/common';

const USER_REPOSITORY = { provide: UserRepository, useClass: UserRepositoryImpl };

@Module({
    providers: [USER_REPOSITORY, CreateUserService],
    exports: [USER_REPOSITORY],
    controllers: [UserController]
})
export class UserModule {
}