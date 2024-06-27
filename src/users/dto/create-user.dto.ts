import { ApiBody, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Role } from '../../utils/enum';
import { IsAlpha, IsAlphanumeric, IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateByOptions, isNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';


export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    default: Role.ROOMMATE,
    enum: Role
  })
  @IsNotEmpty()
  @IsAlpha()
  role: Role;

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
}