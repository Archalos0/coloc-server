import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { Response } from 'express';
import { parsingInt } from 'src/utils';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('houses')
@Controller('houses')
export class HousesController {
    constructor(private housesService: HousesService) {}
    
    @Get(':houseID')
    async findOneByID(@Res() res: Response, @Param('houseID') paramHouseID: any){
        try {
            const houseID: number = parsingInt(paramHouseID)
            if(!houseID) res.status(HttpStatus.BAD_REQUEST).json({error: 'Invalid houseID'}).send()

            const user = await this.housesService.findOneByID(houseID)

            res.status(HttpStatus.OK).json({data: user}).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error}).send()
        }
    }

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const users = await this.housesService.findAll()

            res.status(HttpStatus.OK).json({data: users}).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error}).send()
        }
    }
    
    @Post()
    async create(@Res() res: Response, @Body() createHouseDto: CreateHouseDto) {
        try {
            console.log(createHouseDto)
            const house = await this.housesService.create(createHouseDto)
            res.status(HttpStatus.CREATED).json(house).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send()
        }
    }

    @Get(':houseID/users')
    async findAllOccupants(@Res() res: Response, @Param('houseID') paramHouseID: any) {
        try {
            const houseID = parsingInt(paramHouseID)
            if(!houseID) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid houseID' }).send()
            }

            const occupants = await this.housesService.findAllOccupants(houseID)

            res.status(HttpStatus.OK).json(occupants).send()
        } catch(error: any) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send()
        }
    }

    @Delete(':houseID')
    async delete(@Res() res: Response, @Param('houseID') paramHouseID: any) {
        try {
            const houseID = parsingInt(paramHouseID)
            if(!houseID) res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalide houseID'}).send()

            const deletedHouse = await this.housesService.delete(houseID)

            res.status(HttpStatus.NO_CONTENT).send()
        } catch (error) {
            console.log(error)
            console.log(error.code)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send()           
        }
    }

    @Put(':houseID')
    async update(@Res() res: Response, @Param('houseID') paramHouseID: any, @Body() updateHouseDto: UpdateHouseDto) {
        try {
            const houseID = parsingInt(paramHouseID)
            if(!houseID) res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid houseID'}).send()
            
            const updatedHouse = await this.housesService.update(houseID, updateHouseDto)

            res.status(HttpStatus.OK).json(updatedHouse).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error}).send()
        }
    }
}