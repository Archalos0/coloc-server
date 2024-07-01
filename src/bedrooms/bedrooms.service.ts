import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Bedroom } from '@prisma/client';

@Injectable()
export class BedroomsService {

    constructor(private prisma: PrismaService) { }

    async findOne(where: Prisma.BedroomWhereUniqueInput): Promise<Bedroom | null> {
        try {
            const bedroom = await this.prisma.bedroom.findUnique({ where })
            return bedroom
        } catch (error: any) {
            throw error
        }
    }

    async findAll() {
        try {
            const bedrooms = await this.prisma.bedroom.findMany()
            return bedrooms
        } catch (error: any) {
            throw error
        }
    }

    async create(data: Prisma.BedroomCreateInput) {
        try {
            const createdBedroom = await this.prisma.bedroom.create({ data })
            return createdBedroom
        } catch (error: any) {
            console.log(error)
            throw error
        }
    }


    async update(where: Prisma.BedroomWhereUniqueInput, data: Prisma.BedroomUpdateInput) {
        try {
            const updatedBedroom = await this.prisma.bedroom.update({ where, data })
            return updatedBedroom
        } catch (error: any) {
            throw error
        }
    }

    async delete(where: Prisma.BedroomWhereUniqueInput) {
        try {
            const deletedBedroom = await this.prisma.bedroom.delete({ where })
            return deletedBedroom
        } catch (error: any) {
            throw error
        }
    }

}