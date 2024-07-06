import { BadRequestException, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { House } from '@prisma/client';
import { HousesService } from 'src/houses/houses.service';
import { FilesService } from '../files.service';
import { File, Files } from '../dto/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from '../dto/create-file.dto';
import { FileController } from '../files.controller';

@ApiTags("Files")
@ApiBearerAuth()
@Controller('houses/:houseID/files')
export class HousesFileController extends FileController{
  constructor(filesService: FilesService, private housesService: HousesService) { super(filesService); }

  @ApiOkResponse({
    description:
      'All the files of the house',
    type: Files
  })
  @Get()
  async getAllFiles(@Param('houseID') paramHouseID: number) {
    const house: House = await this.housesService.findOne({ID: paramHouseID})
    if(!house) throw new BadRequestException('Invalid House ID')
    
    const files: File[] = await this.filesService.getAllHouseFiles(house.ID)
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
  async uploadFiles(@Param('houseID') paramHouseID: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    const house: House = await this.housesService.findOne({ID: paramHouseID})
    if(!house) throw new BadRequestException('Invalid House ID')

    // TODO: send the file in the sftp server (docker) + Make it function
    await this.filesService.sendFiles(files, '/files/houses/' + paramHouseID + '/')
    
    // TODO: make the good path to the file + make it function
    const filesData: CreateFileDto[] = files.map(file => { return new CreateFileDto(house.ID, file.originalname, "sftp://51.178.45.24/upload/houses/" + house.ID + "/" + file.originalname)})
    const filesCreated = await this.filesService.saveFiles(filesData)
    return {
      files: filesCreated
    }
  }
}
