import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [HousesController],
    providers: [HousesService, PrismaService]
})
export class HousesModule {}