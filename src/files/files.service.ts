import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { File as PrismaFile } from '@prisma/client';
import { CreateFileDto } from './dto/create-file.dto';
import { SFTPFile } from './dto/sftp-file.dto';

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

    async sendFiles(files: Array<Express.Multer.File>, destination: string): Promise<string[]> {
        let sftp = new Client();
        let filesUploaded: string[]

        await sftp.connect({
            host: '51.178.45.24',
            port: 22,
            username: 'sftpuser',
            password: 'q4nfH87a7e9V9UhbWBN9'
        })
        .then(() => {
            return sftp.mkdir(destination, true)
        })
        .then(() => {
            return sftp.list(destination)
        })
        .then((data: Array<SFTPFile>) => {
            return Promise.all(files.map(file => {
                let fileName: string = file.originalname
                let index: number = 0
                while(data.find(element => element.name == fileName)) {
                    index++
                    fileName = file.originalname + " (" + index + ")" 
                }
                return sftp.put(file.buffer, destination + fileName)
            }))
        })
        .then((data: string[]) => {
            filesUploaded = data.map(fileUploaded => {
                return fileUploaded.replace('Uploaded data stream to ', '')
            })
        })
        .then(
            sftp.end()
        )

        return filesUploaded
    }

    async saveFiles(files: CreateFileDto[]): Promise<PrismaFile[]> {
        try {
            console.log(files)
            const filesCreated: PrismaFile[] = await this.prisma.file.createManyAndReturn({
                data: files
            })

            return filesCreated
        } catch (error: any) {
            throw new InternalServerErrorException(error)
        }
    }
}
