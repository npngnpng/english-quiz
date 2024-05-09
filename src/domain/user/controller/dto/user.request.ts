export class CreateUserRequest {
    name: string;
    accountId: string;
    password: string;
}

export class LoginRequest {
    accountId: string;
    password: string;
}