import { Injectable } from '@nestjs/common';
import { House } from './interfaces/house.interface';
import prisma from '../database';

@Injectable()
export class HousesService {
  private readonly users: House[] = [];

  constructor() {
    this.users = [];
  }

  async create(house: any) {
    try {
      const houseCreated = await prisma.house.create({data: house})
      return houseCreated
    } catch(error: any) {
      console.log(error)
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
      throw new Error(error)
    }
  }
}