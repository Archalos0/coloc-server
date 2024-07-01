import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import { IsBoolean, IsDecimal, IsInt, IsJSON, IsNotEmpty, IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';


export class CreateBedroomDto {
    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsInt()
    size: number;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsInt()
    houseID: number

    @ApiProperty({
        required: false,
        default: true
    })
    @IsOptional()
    @IsBoolean()
    isEquipped: boolean;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsInt()
    occupantID?: number;
}