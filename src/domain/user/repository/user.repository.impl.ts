import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../../global/prisma/prisma.client.js';
import { User } from '../model/user.model.js';
import { UserRepository } from './user.repository.js';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly prisma: PrismaClientService
    ) {
    }

    async saveUser(user: User): Promise<User> {
        return this.prisma.getClient().user.create({
            data: {
                name: user.name,
                accountId: user.accountId,
                password: user.password
            }
        });
    }

    async findByAccountId(accountId: string): Promise<User | null> {
        return this.prisma.getClient().user.findUnique({
            where: {
                accountId: accountId
            }
        });
    }

}