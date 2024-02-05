import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateBedroomDto } from './dto/create-bedroom.dto';
import { BedroomsService } from './bedrooms.service';

@Controller('bedrooms')
export class BedroomsController {
    constructor(private bedroomsService: BedroomsService) {}

    @Post()
    async create(@Res() res: Response, @Body() createdBedroom: CreateBedroomDto) {
        try {
            console.log(createdBedroom)
            const bedroomCreated = await this.bedroomsService.create(createdBedroom)
            res.status(HttpStatus.OK).json(bedroomCreated).send()
        } catch(error: any) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send()
        }
    }
}