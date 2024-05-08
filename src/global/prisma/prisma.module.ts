import { Global, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma.client';

@Global()
@Module({
    providers: [PrismaClientService],
    exports: [PrismaClientService]
})
export class PrismaModule {
}