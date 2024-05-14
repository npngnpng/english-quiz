import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository.js';
import { CreateUserRequest } from '../controller/dto/user.request.js';
import { User } from '../model/user.model.js';
import { PasswordEncoder } from '../../../global/auth/password.encoder.js';
import { CashRepository } from '../../cash/repository/cash.repository.js';
import { Cash } from '../../cash/model/cash.model.js';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        @Inject(PasswordEncoder)
        private readonly passwordEncoder: PasswordEncoder,
        @Inject(CashRepository)
        private readonly cashRepository: CashRepository
    ) {
    }

    async execute(request: CreateUserRequest): Promise<void> {
        if (await this.userRepository.findByAccountId(request.accountId)) {
            throw new ConflictException('User Already Exists');
        }

        const user = await this.userRepository.saveUser(new User(
            request.name,
            request.accountId,
            await this.passwordEncoder.encode(request.password)
        ));
        await this.cashRepository.saveCash(new Cash(user.id));
    }
}