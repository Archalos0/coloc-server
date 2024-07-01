import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { File as PrismaFile } from '@prisma/client';

@Injectable()
export class FilesService {

    constructor(private prisma: PrismaService) { }

    async getAllUsersFiles(userID: number): Promise<PrismaFile[]> {
        try {
            const files: PrismaFile[] = await this.prisma.file.findMany({ where: { userID: userID}})
            return files
        } catch (error: any) {
            throw new InternalServerErrorException()
        }
    }
}
