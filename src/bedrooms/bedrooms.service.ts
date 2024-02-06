import { Injectable } from '@nestjs/common';
import prisma from '../database';

@Injectable()
export class BedroomsService {
    
    async findOneByID(bedroomID: number) {
        try {
            const bedroom = await prisma.bedroom.findUnique({
                where: {
                    ID: bedroomID
                }
            })

            return bedroom
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findAll() {
        try {
            const bedrooms = await prisma.bedroom.findMany()

            return bedrooms
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(dataBedroom: any) {
        try {
            const createdBedroom = await prisma.bedroom.create({data : dataBedroom})
            return createdBedroom
        } catch(error: any) {
            throw new Error(error)
        }
    }


    async update(bedroomID: number, dataBedroom: any) {
        try {
            const updatedBedroom = await prisma.bedroom.update({
                where: {
                    ID: bedroomID
                },
                data : dataBedroom
            })

            return updatedBedroom
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async delete(bedroomID: number) {
        try {
            const deletedBedroom = await prisma.bedroom.delete({
                where: {
                    ID: bedroomID
                }
            })

            return deletedBedroom
        } catch (error: any) {
            throw new Error(error)
        }
    }

}