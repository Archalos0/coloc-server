import { ApiBody, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Role } from '../../utils/enum';
import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: Role.ROOMMATE,
    enum: Role
  })
  @IsNotEmpty()
  role: Role;

  @ApiProperty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  photo?: string;

  @ApiProperty()
  @IsOptional()
  birthday?: Date;

  @ApiProperty()
  @IsOptional()
  phoneNumber?: string;
}