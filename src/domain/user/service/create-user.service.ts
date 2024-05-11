import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserRequest } from '../controller/dto/user.request';
import { User } from '../model/user.model';
import { PasswordEncoder } from '../../../global/auth/password.encoder';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        @Inject(PasswordEncoder)
        private readonly passwordEncoder: PasswordEncoder
    ) {
    }

    async execute(request: CreateUserRequest): Promise<void> {
        const user = await this.userRepository.findByAccountId(request.accountId);
        if (user) {
            throw new ConflictException('User Already Exists');
        }

        await this.userRepository.saveUser(new User(
            request.name,
            request.accountId,
            await this.passwordEncoder.encode(request.password)
        ));
    }
}