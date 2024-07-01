import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateHouseDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  ownerID?: number;
}