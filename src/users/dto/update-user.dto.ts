import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  //@
  photo?: Buffer;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  birthday?: Date;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber("FR")
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}