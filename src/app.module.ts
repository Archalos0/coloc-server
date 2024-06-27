import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousesModule } from './houses/houses.module';
import { UsersModule } from './users/users.module';
import { BedroomsModule } from './bedrooms/bedrooms.module';

@Module({
  imports: [UsersModule, HousesModule, BedroomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
