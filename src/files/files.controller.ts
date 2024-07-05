import { BadRequestException, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { FilesService } from './files.service';
import { File, Files } from './dto/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';

export abstract class FileController {
  constructor(protected filesService: FilesService) {}

  /** 
   ** This method should be decorated by \@Get(), \@ApiOKResponse()
   * @param id is the id of the data manipulated
   **   - has to be decorated by : \@Param('\<id\>') : where \<id\> is the name of the variable you put on the route
  */ 
  abstract getAllFiles(id: number): Promise<{files : File[]}>;

  /**
   ** This method should be decorated by :
   * * -\@Post(), 
   * * -\@ApiCreatedResponse(),
   * * -\@UseInterceptors(FilesInterceptor('files'))
   * @param id is the id of the data manipulated
   **   - has to be decorated by \@Param('\<id\>') : where \<id\> is the name of the variable you put on the route
   * @param files is an Array of all the file uploaded on the server
   **   - has to be decorated with \@UploadedFiles()
  */ 
  abstract uploadFiles(id: number, files: Array<Express.Multer.File>): Promise<Files>;
}
