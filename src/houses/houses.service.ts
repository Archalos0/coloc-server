import { Injectable } from '@nestjs/common';
import { House } from './interfaces/house.interface';
import prisma from '../database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaError } from 'src/utils';

@Injectable()
export class HousesService {

  async findOneByID(houseID: number) {
    try {
      const house = await prisma.house.findUnique({
        where: {
          ID: houseID
        }
      })
      return house
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      const houses = await prisma.house.findMany()
      return houses
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAllOccupants(houseID: number) {
    try {
      const occupants = await prisma.user.findMany({
        where: {
          bedroom: {
            houseID: houseID
          }
        }
      })
      return occupants
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async create(house: any) {
    try {
      const houseCreated = await prisma.house.create({ data: house })
      return houseCreated
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }


  
  async update(houseID: number, dataHouse: any) {
    try {
      const updatedUser = await prisma.house.update({
        where: {
          ID: houseID
        },
        data: dataHouse
      })
      
      return updatedUser
    } catch (error: any) {
      throw new Error(error)
    }
  }
  
  async delete(houseID: number) {
    try {
      const deletedUser = await prisma.house.delete({
        where: {
          ID: houseID
        }
      })
  
      return deletedUser
    } catch (error) {
      throw new Error(error)
    }
  }
}