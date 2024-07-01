import { Injectable } from '@nestjs/common';
// import prisma from '../prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaError } from 'src/utils';
import { PrismaService } from 'src/prisma.service';
import { Prisma, House, User } from '@prisma/client';

@Injectable()
export class HousesService {
  constructor(private prisma: PrismaService) { }

  async findOne(houseWhereUniqueInput: Prisma.HouseWhereUniqueInput): Promise<House | null> {
    try {
      const house = await this.prisma.house.findUnique({ where: houseWhereUniqueInput })
      return house
    } catch (error: any) {
      throw error
    }
  }

  async findAll(): Promise<House[]> {
    try {
      const houses = await this.prisma.house.findMany()
      return houses
    } catch (error: any) {
      throw error
    }
  }

  async findAllOccupants(houseID: number): Promise<User[]> {
    try {
      const occupants = await this.prisma.user.findMany({
        where: {
          bedroom: {
            houseID: houseID
          }
        }
      })
      return occupants
    } catch (error: any) {
      console.log(error)
      throw error
    }
  }

  async create(data: Prisma.HouseCreateInput): Promise<House> {
    try {
      const houseCreated = await this.prisma.house.create({ data })
      return houseCreated
    } catch (error: any) {
      console.log(error)
      throw error
    }
  }

  async update(where: Prisma.HouseWhereUniqueInput, data: Prisma.HouseUpdateInput): Promise<House> {
    try {
      const updatedUser = await this.prisma.house.update({ where, data })
      return updatedUser
    } catch (error: any) {
      throw error
    }
  }

  async delete(where: Prisma.HouseWhereUniqueInput) {
    try {
      const deletedUser = await this.prisma.house.delete({ where })

      return deletedUser
    } catch (error) {
      throw error
    }
  }
}