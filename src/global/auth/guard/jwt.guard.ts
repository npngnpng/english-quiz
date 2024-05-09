import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../domain/user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../domain/user/model/user.model';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token: string = request.headers.authorization?.substring(7);

        const { sub } = this.parseToken(token);
        const currentUser = await this.userRepository.findByAccountId(sub);
        request.user = new User(
            currentUser.name,
            currentUser.accountId,
            currentUser.password,
            currentUser.id
        );
        return true;
    }

    private parseToken(token: string) {
        let parsedToken: any;
        try {
            parsedToken = this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }
        if (parsedToken.typ != 'access') {
            throw new UnauthorizedException('Invalid Token');
        }

        return parsedToken;
    }
}