import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsUrl } from 'class-validator';


export class File {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  path: string;
}

export class Files {
    @ApiProperty({type: [File]})
    @IsArray()
    files: File[]
}