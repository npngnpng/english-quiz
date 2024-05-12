import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserRequest {
    @IsNotEmpty()
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @MaxLength(30)
    accountId: string;

    @IsNotEmpty()
    password: string;
}
