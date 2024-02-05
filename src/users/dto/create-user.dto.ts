import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../utils/enum';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({
    default: Role.ROOMMATE,
  })
  role: Role;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  photo?: string;

  @ApiProperty()
  birthday?: Date;

  @ApiProperty()
  phoneNumber?: string;
}