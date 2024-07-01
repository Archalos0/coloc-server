import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponseMetadata, ApiResponseOptions, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { FilesService } from './files.service';
import { File, Files } from './dto/file.dto';

@ApiTags("File")
@ApiBearerAuth()
@Controller('files')
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
}
