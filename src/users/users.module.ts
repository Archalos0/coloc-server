import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { TransformBirthdayMiddleware } from 'src/middleware.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TransformBirthdayMiddleware)
            .forRoutes('users'); // Remplacez 'users/create' par le chemin de votre endpoint de création d'utilisateur
    }
}