import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginRequest {
    @IsNotEmpty()
    @MaxLength(30)
    accountId: string;

    @IsNotEmpty()
    password: string;
}