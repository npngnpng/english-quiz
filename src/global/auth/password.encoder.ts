export interface PasswordEncoder {
    encode(password: string): Promise<string>;

    matchPassword(rawPassword: string, encodedPassword: string): Promise<boolean>;
}

export const PasswordEncoder = Symbol('PasswordEncoder');