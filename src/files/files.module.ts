import { Module } from '@nestjs/common';
import { FileController } from './files.controller';
import { FilesService } from './files.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FileController],
  providers: [FilesService, UsersService, PrismaService]
})
export class FileModule {}
