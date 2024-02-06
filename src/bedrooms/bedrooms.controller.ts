import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateBedroomDto } from './dto/create-bedroom.dto';
import { BedroomsService } from './bedrooms.service';
import { UpdateBedroomDto } from './dto/update-bedroom.dto';
import { parsingInt } from 'src/utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bedrooms')
@Controller('bedrooms')
export class BedroomsController {
    constructor(private bedroomsService: BedroomsService) {}

    @Get(':bedroomID')
    async findOneByID(@Res() res: Response, @Param('bedroomID') paramBedroomID: any) {
        try {
            const bedroomID = parsingInt(paramBedroomID)
            if(!bedroomID) res.status(HttpStatus.BAD_REQUEST).json({error: 'Invalid bedroomID'}).send()

            const bedroom = await this.bedroomsService.findOneByID(bedroomID)

            res.status(HttpStatus.OK).json({data: bedroom}).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error}).send()
        }
    }

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const bedrooms = await this.bedroomsService.findAll()
            res.status(HttpStatus.OK).json({data: bedrooms}).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:error}).send()
        }
    }
    
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

    @Put(':bedroomID')
    async update(@Res() res: Response, @Param('bedroomID') paramBedroomID: any, @Body() updateBedroomDto: UpdateBedroomDto) {
        try {
            
            const bedroomID = parsingInt(paramBedroomID)
            if(!bedroomID) res.status(HttpStatus.BAD_REQUEST).json({error: 'Invalid bedroomID'}).send()

            const updatedBedroom = await this.bedroomsService.update(bedroomID, updateBedroomDto)
            
            res.status(HttpStatus.OK).json({data : updatedBedroom}).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error}).send()
        }
    }

    @Delete(':bedroomID')
    async delete(@Res() res: Response, @Param('bedroomID') paramBedroomID: any){
        try {
            const bedroomID = parsingInt(paramBedroomID)
            if(!bedroomID) res.status(HttpStatus.BAD_REQUEST).json({error: 'Invalid bedroomID'}).send()

            const deletedBedroom = await this.bedroomsService.delete(bedroomID)

            res.status(HttpStatus.NO_CONTENT).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error}).send()
        }
    }
}