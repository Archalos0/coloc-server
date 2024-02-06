import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import prisma from '../database';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  async findOneByID(userID: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          ID: userID
        }
      })

      return user
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      const users = await prisma.user.findMany()
      return users

    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async create(user: any) {
    try {
      const userCreated = await prisma.user.create({ data: user })
      return userCreated
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async update(userID: number, dataUser: any) {
    try {
      const updatedUser = await prisma.user.update({ 
        where: {
          ID: userID
        },
        data: dataUser 
      })

      return updatedUser
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete(userID: number){
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          ID: userID
        }
      })

      return deletedUser
    } catch (error: any) {
      throw new Error(error)
    }
  }
}