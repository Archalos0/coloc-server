import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersFileController } from './users/users-files.controller';
import { HousesFileController } from './houses/houses-files.controller';
import { HousesService } from 'src/houses/houses.service';

@Module({
  controllers: [UsersFileController, HousesFileController],
  providers: [FilesService, UsersService, HousesService, PrismaService]
})
export class FileModule {}
