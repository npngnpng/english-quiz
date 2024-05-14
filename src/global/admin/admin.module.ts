import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClientService } from '../prisma/prisma.client.js';
import AdminJS, { ComponentLoader } from 'adminjs';
import {
    createCashHistoryResource,
    createCashResource,
    createQuizResource,
    createUserResource,
    createWordResource
} from './resources.js';

AdminJS.registerAdapter({ Database, Resource });
const componentLoader = new ComponentLoader();


@Module({
    imports: [
        import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const prisma = new PrismaClientService();
                return {
                    adminJsOptions: {
                        componentLoader: componentLoader,
                        rootPath: '/admin',
                        resources: [
                            createUserResource(prisma, componentLoader, configService.get('ADMINJS_LICENCE')),
                            createQuizResource(prisma),
                            createWordResource(prisma),
                            createCashResource(prisma),
                            createCashHistoryResource(prisma)

                        ]
                    },
                    auth: {
                        authenticate: async (email: string, password: string) => {
                            const defaultAdminAccountId = configService.get('DEFAULT_ADMIN_ACCOUNT_ID');
                            const defaultAdminPassword = configService.get('DEFAULT_ADMIN_PASSWORD');
                            if (email === defaultAdminAccountId && password === defaultAdminPassword) {
                                return Promise.resolve({
                                    email: defaultAdminAccountId,
                                    password: defaultAdminPassword
                                });
                            }
                            return null;
                        },
                        cookieName: 'adminjs',
                        cookiePassword: 'secret'
                    },
                    sessionOptions: {
                        resave: true,
                        saveUninitialized: true,
                        secret: 'secret'
                    }
                };
            }
        }))
    ]
})
export class AdminModule {

}