import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService, UsersService]
})
export class AuthenticationModule {}
