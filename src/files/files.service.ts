import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { File as PrismaFile } from '@prisma/client';
import { CreateFileDto } from './dto/create-file.dto';

const Client = require('ssh2-sftp-client');

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

    async sendFiles(files: Array<Express.Multer.File>, destination: string) {
        let sftp = new Client();
        
        sftp.connect({
            host: '51.178.45.24',
            port: 22,
            username: 'sftpuser',
            password: 'q4nfH87a7e9V9UhbWBN9'
        })
        .then(() => {
            return sftp.mkdir(destination, true)
        })
        .then(() => {
            files.map(file => {
                sftp.put(file.buffer, destination + file.originalname)
            })
        })
        .then(
            sftp.end()
        )
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
