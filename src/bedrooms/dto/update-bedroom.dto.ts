import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';


export class UpdateBedroomDto {
    @ApiProperty({
        required: true
    })
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({
        required: true
    })
    @IsOptional()
    @IsInt()
    size?: number;

    @ApiProperty({
        required: true
    })
    @IsOptional()
    @IsObject()
    house?: Prisma.HouseCreateNestedOneWithoutBedroomsInput;

    @ApiProperty({
        required: false,
        default: true
    })
    @IsOptional()
    @IsBoolean()
    isEquipped?: Boolean;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsObject()
    occupant?: Prisma.UserCreateNestedOneWithoutBedroomInput;
}