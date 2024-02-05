import { Injectable } from '@nestjs/common';
import prisma from '../database';

@Injectable()
export class BedroomsService {
    

    async create(dataBedroom: any) {
        try {
            const createdBedroom = await prisma.bedroom.create({data : dataBedroom})
            return createdBedroom
        } catch(error: any) {
            throw new Error(error)
        }
    }

}