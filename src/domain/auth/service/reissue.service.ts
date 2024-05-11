import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtProvider } from '../../../global/auth/jwt.provider';
import { TokenResponse } from '../../user/controller/dto/user.response';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ReissueService {
    constructor(
        private readonly jwtProvider: JwtProvider,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
    }

    async execute(refreshToken: string): Promise<TokenResponse> {
        const accountId: string = await this.cacheManager.get(refreshToken);
        if (!accountId) {
            throw new NotFoundException('RefreshToken Not Found');
        }
        await this.cacheManager.del(refreshToken);

        return this.jwtProvider.generateTokens(accountId);
    }
}