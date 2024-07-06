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
      'Return all the files of the house',
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

  @ApiCreatedResponse({
    description: 'Upload all the files in the house space',
    type: Files
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@Param('houseID') paramHouseID: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    const house: House = await this.housesService.findOne({ID: paramHouseID})
    if(!house) throw new BadRequestException('Invalid House ID')

    const filesUploaded: string[] = await this.filesService.sendFiles(files, '/files/houses/' + house.ID + '/')
    const filesCreated: File[] = await this.filesService.createHouseFiles(house.ID, filesUploaded)
    
    return {
      files: filesCreated
    }
  }
}
