import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import prisma from '../database';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  constructor() {
    this.users = [];
  }

  async create(cat: any) {
    try {
      const userCreated = await prisma.user.create({data: cat})
      return userCreated
    } catch(error: any) {
      console.log(error)
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
}