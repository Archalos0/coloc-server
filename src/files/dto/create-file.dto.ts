import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateFileDto {
  constructor(fileName: string, path: string) {
    this.fileName = fileName;
    this.path = path;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  path: string;
}