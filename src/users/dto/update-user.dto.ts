import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  photo?: string;

  @ApiProperty()
  birthday?: Date;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  description?: string;
}