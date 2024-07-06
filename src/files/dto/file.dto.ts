import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';


export class File {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileName: string;

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