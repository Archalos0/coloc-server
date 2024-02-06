import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';


export class UpdateBedroomDto {
    @ApiProperty({
        required: true
    })
    @IsOptional()
    price?: number;

    @ApiProperty({
        required: true
    })
    @IsOptional()
    size?: number;

    @ApiProperty({
        required: true
    })
    @IsOptional()
    houseID?: number;

    @ApiProperty({
        required: false,
        default: true
    })
    @IsOptional()
    isEquipped?: Boolean;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    occupantID?: number;
}