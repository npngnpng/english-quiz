import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class JwtProvider {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
    }

    async generateTokens(accountId: string) {
        const accessToken = await this.generateToken(accountId, 'access', '1h');
        const refreshToken = await this.generateToken(accountId, 'refresh', '14d');

        await this.cacheManager.set(accountId, refreshToken);

        return { accessToken, refreshToken };
    }

    private async generateToken(accountId: string, typ: string, exp: string) {
        return await this.jwtService.signAsync(
            { sub: accountId, typ },
            { expiresIn: '1h' }
        );
    }
}