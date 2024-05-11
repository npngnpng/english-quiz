import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordEncoder } from './password.encoder';

@Injectable()
export class PasswordEncoderImpl implements PasswordEncoder {

    async encode(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async matchPassword(rawPassword: string, encodedPassword: string): Promise<boolean> {
        return await bcrypt.compare(rawPassword, encodedPassword);
    }
}