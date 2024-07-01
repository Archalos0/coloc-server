import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousesModule } from './houses/houses.module';
import { UsersModule } from './users/users.module';
import { BedroomsModule } from './bedrooms/bedrooms.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { verifyToken } from './authentication/authentication.middleware';
import path from 'path';

@Module({
  imports: [UsersModule, HousesModule, BedroomsModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyToken)
      .exclude(
        { path: '/auth/register', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/signIn', method: RequestMethod.POST },
      )
      .forRoutes(''); // Remplacez 'users/create' par le chemin de votre endpoint de création d'utilisateur
  }
}
