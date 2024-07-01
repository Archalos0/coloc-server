import { Module } from '@nestjs/common';
import { BedroomsController } from './bedrooms.controller';
import { BedroomsService } from './bedrooms.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BedroomsController],
  providers: [BedroomsService, PrismaService]
})
export class BedroomsModule {}