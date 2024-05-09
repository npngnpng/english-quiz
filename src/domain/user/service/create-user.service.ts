import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserRequest } from '../controller/dto/user.request';
import { User } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { TransactionService } from '../../../global/prisma/transaction.service';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly transactionService: TransactionService
    ) {
    }

    public async execute(request: CreateUserRequest) {
        return await this.transactionService.transaction(async () => {
            const user = await this.userRepository.findByAccountId(request.accountId);
            if (user) {
                throw new ConflictException('User Already Exists');
            }

            await this.userRepository.saveUser(new User(
                request.name,
                request.accountId,
                await bcrypt.hash(request.password, 10)
            ));
        });

    }
}