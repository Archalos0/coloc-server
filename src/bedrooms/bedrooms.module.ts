import { Module } from '@nestjs/common';
import { BedroomsController } from './bedrooms.controller';
import { BedroomsService } from './bedrooms.service';

@Module({
  controllers: [BedroomsController],
  providers: [BedroomsService]
})
export class BedroomsModule {}