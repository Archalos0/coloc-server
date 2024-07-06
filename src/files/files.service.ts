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
        const sftp = new Client();
        const filesUploaded: string[] = []

        try {
            
            await sftp.connect({
                host: '51.178.45.24',
                port: 22,
                username: 'sftpuser',
                password: 'q4nfH87a7e9V9UhbWBN9'
            })

            await sftp.mkdir(destination, true)
            const existingFiles = await sftp.list(destination);

            for (const file of files) {
                const fileName: string = this._namingFile(existingFiles, file)

                await sftp.put(file.buffer, `${destination}${fileName}`);
                filesUploaded.push(`${destination}${fileName}`);
            }

        } catch (error: any) {
            throw new InternalServerErrorException('Error uploading files:')
        }
        finally {
            await sftp.end();
            return filesUploaded
        }
    }

    _namingFile(existingFiles: Array<SFTPFile>, file: Express.Multer.File): string {
        let fileName: string = file.originalname;
        let index: number = 0;

        while (existingFiles.find(element => element.name === fileName)) {
          index++;
          fileName = `${file.originalname} (${index})`;
        }

        return fileName
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
