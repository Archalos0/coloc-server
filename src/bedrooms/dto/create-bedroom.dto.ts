import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';


export class CreateBedroomDto {
    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    size: number;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    houseID: number;

    @ApiProperty({
        required: false,
        default: true
    })
    @IsOptional()
    isEquipped: Boolean;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    occupantID?: number;
}