import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

    async encode(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async matchPassword(rawPassword: string, encodedPassword: string) {
        return await bcrypt.compare(rawPassword, encodedPassword);
    }
}