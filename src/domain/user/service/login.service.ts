import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { LoginRequest } from '../controller/dto/user.request';
import { JwtProvider } from '../../../global/auth/jwt.provider';
import { LoginResponse } from '../controller/dto/user.response';
import { PasswordEncoder } from '../../../global/auth/password.encoder';

@Injectable()
export class LoginService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtProvider: JwtProvider,
        @Inject(PasswordEncoder)
        private readonly passwordEncoder: PasswordEncoder
    ) {
    }

    async execute(request: LoginRequest): Promise<LoginResponse> {
        const user = await this.userRepository.findByAccountId(request.accountId);
        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        if (!(await this.passwordEncoder.matchPassword(request.password, user.password))) {
            throw new UnauthorizedException('Invalid Password');
        }

        return this.jwtProvider.generateTokens(user.accountId);
    }
}