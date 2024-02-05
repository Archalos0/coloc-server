import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { Response } from 'express';

@Controller('houses')
export class HousesController {
    constructor(private housesService: HousesService) {}
    
    
    @Post()
    async create(@Res() res: Response, @Body() createHouseDto: CreateHouseDto) {
        try {
            console.log(createHouseDto)
            const house = await this.housesService.create(createHouseDto)
            res.status(HttpStatus.CREATED).json(house).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }

    @Get(':houseID')
    async findAllOccupants(@Res() res: Response, @Param() houseID: number) {
        try {
            const occupants = await this.housesService.findAllOccupants(houseID)
            console.log(occupants)
            res.status(HttpStatus.OK).json(occupants).send()
        } catch(error: any) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }

    // @Get(':id')
    // findByID(@Param() params: any): string{
    //     return `This will return the user associated to the ID : ${params.id}`
    // }
}