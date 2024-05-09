import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { LoginRequest } from '../controller/dto/user.request';
import { JwtProvider } from '../../../global/auth/jwt.provider';
import { LoginResponse } from '../controller/dto/user.response';
import { PasswordService } from '../../../global/auth/password.service';

@Injectable()
export class LoginService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtProvider: JwtProvider,
        private readonly passwordService: PasswordService
    ) {
    }

    public async execute(request: LoginRequest): Promise<LoginResponse> {
        const user = await this.userRepository.findByAccountId(request.accountId);
        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        if (!(await this.passwordService.matchPassword(request.password, user.password))) {
            throw new UnauthorizedException('Invalid Password');
        }

        return this.jwtProvider.generateTokens(user.accountId);
    }
}