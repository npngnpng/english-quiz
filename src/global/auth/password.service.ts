import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

    public async encode(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public async matchPassword(rawPassword: string, encodedPassword: string) {
        return await bcrypt.compare(rawPassword, encodedPassword);
    }
}