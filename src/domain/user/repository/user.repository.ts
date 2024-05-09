import { User } from '../model/user.model';

export interface UserRepository {
    saveUser(user: User): Promise<User>;

    findByAccountId(accountId: string): Promise<User | null>;
}

export const UserRepository = Symbol('UserRepository');