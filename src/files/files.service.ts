import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, UserFile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { File as PrismaFile } from '@prisma/client';
import { CreateFileDto } from './dto/create-file.dto';
import { SFTPFile } from './dto/sftp-file.dto';
import { File, Files } from './dto/file.dto';

const Client = require('ssh2-sftp-client');

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async getAllUserFiles(userID: number): Promise<File[]> {
    try {
      const userFiles = await this.prisma.userFile.findMany({
        where: { userID },
        include: { file: true },
      });

      return userFiles.map((file) => file.file);
    } catch (error: any) {
      throw new InternalServerErrorException();
    }
  }

  async getAllHouseFiles(houseID: number): Promise<PrismaFile[]> {
    try {
        const userFiles = await this.prisma.houseFile.findMany({
          where: { houseID },
          include: { file: true },
        });
  
        return userFiles.map((file) => file.file);
      } catch (error: any) {
        throw new InternalServerErrorException();
      }
  }

  async sendFiles(
    files: Array<Express.Multer.File>,
    destination: string,
  ): Promise<string[]> {
    const sftp = new Client();
    const filesUploaded: string[] = [];

    try {
      await sftp.connect({
        host: '51.178.45.24',
        port: 22,
        username: 'sftpuser',
        password: 'q4nfH87a7e9V9UhbWBN9',
      });

      await sftp.mkdir(destination, true);
      const existingFiles = await sftp.list(destination);

      for (const file of files) {
        const fileName: string = this._namingFile(existingFiles, file);

        await sftp.put(file.buffer, `${destination}${fileName}`);
        filesUploaded.push(`${destination}${fileName}`);
      }
    } catch (error: any) {
      throw new InternalServerErrorException('Error uploading files:');
    } finally {
      await sftp.end();
      return filesUploaded;
    }
  }

  _namingFile(
    existingFiles: Array<SFTPFile>,
    file: Express.Multer.File,
  ): string {
    let fileName: string = file.originalname;
    let index: number = 0;

    while (existingFiles.find((element) => element.name === fileName)) {
      index++;
      fileName = `${file.originalname} (${index})`;
    }

    return fileName;
  }

  async _saveFiles(files: CreateFileDto[]): Promise<PrismaFile[]> {
    try {
      console.log(files);
      const filesCreated: PrismaFile[] =
        await this.prisma.file.createManyAndReturn({
          data: files,
        });

      return filesCreated;
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException('Error uploading files:');
    }
  }

  async saveUserFiles(
    userID: number,
    files: CreateFileDto[],
  ): Promise<PrismaFile[]> {
    try {
        const filesSaved: PrismaFile[] = await this._saveFiles(files);

        const userFilesToSaved = filesSaved.map((fileSaved) => {
            return { fileID: fileSaved.ID, userID: userID };
        });

        const filesCreated = await this.prisma.userFile.createManyAndReturn({
            data: userFilesToSaved,
            include: {
            file: true,
            },
        });

        return filesCreated.map((file) => file.file);
    } catch (error: any) {
        throw new InternalServerErrorException('Error uploading files:');
    }
  }

  async createUserFiles(userID: number, pathFiles: string[]): Promise<File[]> {
    try {
        const filesData: CreateFileDto[] = pathFiles.map(filePath => {
            const fileName: string = filePath.split('/').reverse()[0]
            return new CreateFileDto(fileName, filePath)
        })

        return await this.saveUserFiles(userID, filesData)
        
    } catch (error: any) {
        throw new InternalServerErrorException('Error uploading files:');
    }
  }

  async createHouseFiles(houseID: number, pathFiles: string[]): Promise<File[]> {
    try {
        const filesData: CreateFileDto[] = pathFiles.map(filePath => {
            const fileName: string = filePath.split('/').reverse()[0]
            return new CreateFileDto(fileName, filePath)
        })

        return await this.saveHouseFiles(houseID, filesData)
        
    } catch (error: any) {
        throw new InternalServerErrorException('Error uploading files:');
    }
  }

  async saveHouseFiles(
    houseID: number,
    files: CreateFileDto[],
  ): Promise<PrismaFile[]> {
    try {
        const filesSaved: PrismaFile[] = await this._saveFiles(files);

        const userFilesToSaved = filesSaved.map((fileSaved) => {
            return { fileID: fileSaved.ID, houseID: houseID };
        });

        const filesCreated = await this.prisma.houseFile.createManyAndReturn({
            data: userFilesToSaved,
            include: {
                file: true,
            },
        });

        return filesCreated.map((file) => file.file);
    } catch (error: any) {
        throw new InternalServerErrorException('Error uploading files:');
    }
  }
}
