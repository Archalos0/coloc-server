import { BadRequestException, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { FilesService } from './files.service';
import { File, Files } from './dto/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';

@ApiTags("File")
@ApiBearerAuth()
@Controller()
export class FileController {
  constructor(private filesService: FilesService, private usersService: UsersService) {}

  @ApiOkResponse({
    description:
      'All the files of the user',
    type: Files
  })
  @Get()
  async getAllUserFiles(@Param('userID') paramUserID: number) {
    const user: User = await this.usersService.findOne({ID: paramUserID})
    if(!user) throw new BadRequestException('Invalid User ID')
    
    const files: File[] = await this.filesService.getAllUsersFiles(user.ID)
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

    // TODO: send the file in the sftp server (docker)
    
    
    // TODO: make the good path to the file
    const filesData: CreateFileDto[] = files.map(file => { return new CreateFileDto(user.ID, file.originalname, "sftp://51.178.45.24/upload/users/" + user.ID + "/" + file.originalname)})
    
    const filesCreated = await this.filesService.saveFiles(filesData)

    return {
      files: filesCreated
    }
  }
}
