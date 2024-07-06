import { BadRequestException, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { FilesService } from '../files.service';
import { File, Files } from '../dto/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from '../dto/create-file.dto';
import { FileController } from '../files.controller';

@ApiTags("Files")
@ApiBearerAuth()
@Controller('users/:userID/files')
export class UsersFileController extends FileController{
  constructor(filesService: FilesService, private usersService: UsersService) { super(filesService); }

  @ApiOkResponse({
    description:
      'All the files of the user',
    type: Files
  })
  @Get()
  async getAllFiles(@Param('userID') paramUserID: number): Promise<Files> {
    const user: User = await this.usersService.findOne({ID: paramUserID})
    if(!user) throw new BadRequestException('Invalid User ID')
    
    const files: File[] = await this.filesService.getAllUserFiles(user.ID)
    return {
      files: files
    }
  }

  // TODO: upload files => need to have the ftp server
  @ApiCreatedResponse({
    description: 'Upload all the files',
    type: Files
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@Param('userID') paramUserID: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    const user: User = await this.usersService.findOne({ID: paramUserID})
    if(!user) throw new BadRequestException('Invalid User ID')

    const filesUploaded: string[] = await this.filesService.sendFiles(files, '/files/users/' + paramUserID + '/')
   
    // TODO: create the file DTO from filesUploaded + make it function
    const filesData: CreateFileDto[] = files.map(file => { 
      return new CreateFileDto(user.ID, file.originalname, "sftp://51.178.45.24/files/users/" + user.ID + "/" + file.originalname)
    })
    const filesCreated = await this.filesService.saveFiles(filesData)

    return {
      files: filesCreated
    }
  }
}
