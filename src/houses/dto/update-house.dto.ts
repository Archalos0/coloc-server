import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateHouseDto {
  @ApiProperty()
  @IsOptional()
  ownerID?: number;
}