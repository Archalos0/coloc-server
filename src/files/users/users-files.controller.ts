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
      'Return all the files of the user',
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

  @ApiCreatedResponse({
    description: 'Upload all the files in the user space',
    type: Files
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@Param('userID') paramUserID: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    const user: User = await this.usersService.findOne({ID: paramUserID})
    if(!user) throw new BadRequestException('Invalid User ID')

    const filesUploaded: string[] = await this.filesService.sendFiles(files, '/files/users/' + user.ID + '/')
    const filesCreated: File[] = await this.filesService.createUserFiles(user.ID, filesUploaded)
    
    return {
      files: filesCreated
    }
  }
}
