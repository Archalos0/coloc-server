import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateHouseDto {
  @ApiProperty()
  @IsOptional()
  ownerID?: number;
}