import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { Response } from 'express';
import { parsingInt } from 'src/utils';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';


@ApiTags('houses')
@ApiBearerAuth()
@Controller('houses')
export class HousesController {
    constructor(private housesService: HousesService) {}
    
    @Get(':houseID')
    async findOneByID(@Res() res: Response, @Param('houseID') paramHouseID: any){
        try {
            const houseID: number = parsingInt(paramHouseID)
            if(!houseID) res.status(HttpStatus.BAD_REQUEST).json({error: 'Invalid houseID'})

            const user = await this.housesService.findOne({ID: houseID})

            res.status(HttpStatus.OK).json({data: user})
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error})
        }
    }

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const users = await this.housesService.findAll()

            res.status(HttpStatus.OK).json({data: users})
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error})
        }
    }
    
    @Post()
    async create(@Res() res: Response, @Body() createHouseDto: Prisma.HouseCreateInput) {
        try {
            //const houseCreateInput: Prisma.HouseCreateInput = createHouseDto
            const house = await this.housesService.create(createHouseDto)
            res.status(HttpStatus.CREATED).json(house)
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @Get(':houseID/users')
    async findAllOccupants(@Res() res: Response, @Param('houseID') paramHouseID: any) {
        try {
            const houseID = parsingInt(paramHouseID)
            if(!houseID) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid houseID' })
            }

            const occupants = await this.housesService.findAllOccupants(houseID)

            res.status(HttpStatus.OK).json(occupants)
        } catch(error: any) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @Put(':houseID')
    async update(@Res() res: Response, @Param('houseID') paramHouseID: any, @Body() updateHouseDto: UpdateHouseDto) {
        try {
            const houseID = parsingInt(paramHouseID)
            if(!houseID) res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid houseID'})
            
            const houseUpdateInput: any = updateHouseDto
            const updatedHouse = await this.housesService.update({ID: houseID}, houseUpdateInput)

            res.status(HttpStatus.OK).json(updatedHouse).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error})
        }
    }

    @Delete(':houseID')
    async delete(@Res() res: Response, @Param('houseID') paramHouseID: any) {
        try {
            const houseID = parsingInt(paramHouseID)
            if(!houseID) res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalide houseID'})
        
            const deletedHouse = await this.housesService.delete({ID: houseID})

            res.status(HttpStatus.NO_CONTENT).send()
        } catch (error) {
            if(error.code == "P2025") 
                res.status(HttpStatus.NOT_FOUND).json({error : 'The house does not exist'})
            else 
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)        
        }
    }    
}