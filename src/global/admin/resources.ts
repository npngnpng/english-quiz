import { getModelByName } from '@adminjs/prisma';
import { PrismaClientService } from '../prisma/prisma.client.js';
import { owningRelationSettingsFeature, RelationType } from '@adminjs/relations';
import { ComponentLoader } from 'adminjs';

export const createUserResource = (prisma: PrismaClientService, componentLoader: ComponentLoader, licenseKey: string) => ({
    resource: { model: getModelByName('User'), client: prisma },
    features: [
        owningRelationSettingsFeature({
            componentLoader: componentLoader,
            licenseKey: licenseKey,
            relations: {
                word: {
                    type: RelationType.OneToMany,
                    target: {
                        joinKey: 'user',
                        resourceId: 'Word'
                    }
                },
                quiz: {
                    type: RelationType.OneToMany,
                    target: {
                        joinKey: 'user',
                        resourceId: 'Quiz'
                    }
                }
            }

        })
    ],
    options: {}
});

export const createQuizResource = (prisma: PrismaClientService) => ({
    resource: { model: getModelByName('Quiz'), client: prisma },
    options: {
        filterProperties: ['user'],
        properties: {
            word: {
                position: 1
            },
            choice: {
                position: 2
            },
            isCorrect: {
                position: 3
            },
            user: {
                position: 4
            }
        }
    }
});

export const createWordResource = (prisma: PrismaClientService) => ({
    resource: { model: getModelByName('Word'), client: prisma },
    options: {
        properties: {
            english: {
                isTitle: true,
                position: 1
            }
        }
    }
});