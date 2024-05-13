import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../user/repository/user.repository.js';
import { JwtProvider } from '../../../global/auth/jwt.provider.js';
import { TokenResponse } from '../../user/controller/dto/user.response.js';
import { PasswordEncoder } from '../../../global/auth/password.encoder.js';
import { LoginRequest } from '../controller/dto/auth.request.js';

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

    async execute(request: LoginRequest): Promise<TokenResponse> {
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