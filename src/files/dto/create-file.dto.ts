import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateFileDto {
  constructor(userID: number, fileName: string, path: string) {
    this.userID = userID;
    this.fileName = fileName;
    this.path = path;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  path: string;
}