import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsObject, IsOptional } from 'class-validator';

export class CreateHouseDto {
  @ApiProperty()
  @IsOptional()
  @IsObject()
  ownerID?: Prisma.UserCreateNestedOneWithoutHouseOwnedInput;
}