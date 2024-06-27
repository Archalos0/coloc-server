import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    try {
      const user: User = await this.prisma.user.findUnique({ where: userWhereUniqueInput })
      return user
    } catch (error: any) {
      throw error
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.prisma.user.findMany()
      return users
    } catch (error: any) {
      throw error
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const userCreated: User = await this.prisma.user.create({ data })
      return userCreated
    } catch (error: any) {
      throw error
    }
  }

  async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    try {
      const userUpdated: User = await this.prisma.user.update({ where, data })
      return userUpdated
    } catch (error: any) {
      throw error
    }
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      const userDeleted: User = await this.prisma.user.delete({ where })
      return userDeleted
    } catch (error: any) {
      throw error
    }
  }
}