import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { File as PrismaFile } from '@prisma/client';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {

    constructor(private prisma: PrismaService) { }

    async getAllUserFiles(userID: number): Promise<PrismaFile[]> {
        try {
            const files: PrismaFile[] = await this.prisma.file.findMany({ where: { userID: userID}})
            return files
        } catch (error: any) {
            throw new InternalServerErrorException()
        }
    }

    async getAllHouseFiles(houseID: number): Promise<PrismaFile[]> {
        // try {
        //     const files: PrismaFile[] = await this.prisma.file.findMany({ where: { userID: userID}})
        //     return files
        // } catch (error: any) {
        //     throw new InternalServerErrorException()
        // }
        return
    }

    async saveFiles(files: CreateFileDto[]): Promise<PrismaFile[]> {
        try {
            const filesCreated: PrismaFile[] = await this.prisma.file.createManyAndReturn({
                data: files
            })

            return filesCreated
        } catch (error: any) {
            throw new InternalServerErrorException(error)
        }
    }
}
