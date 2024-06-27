import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaError, parsingInt } from 'src/utils';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/utils/enum';
import { Prisma, PrismaClient } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get(':userID')
    async findOneByID(@Res() res: Response, @Param('userID') paramUserID: any) {
        try {
            const userID: number = parsingInt(paramUserID)
            if (!userID) res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid userID' }).send()

            const user = await this.usersService.findOne({ ID: userID })

            res.status(HttpStatus.OK).json({ data: user }).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error }).send()
        }
    }

    @Get()
    async findAll(@Res() res: Response) {
        try {

            const users = await this.usersService.findAll()
            res.status(HttpStatus.OK).json(users).send()
        } catch (error: any) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error}).send()
        }
    }

    @Post()
    async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
        try {
            const userCreateInput: Prisma.UserCreateInput = createUserDto
            const user = await this.usersService.create(userCreateInput)
            res.status(HttpStatus.CREATED).json(user).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error }).send()
        }
    }

    /*
        Status :
            - 200 (OK) : data updated
            - 201 (CREATED) : the data was not in the dabase and is created with the request
            - 204 (NO_CONTENT) : update but no content
    */
    @Put(':userID')
    async update(@Res() res: Response, @Param('userID') paramUserID: any, @Body() updateUserDto: Prisma.UserUpdateInput) {
        try {
            const userID = parsingInt(paramUserID)
            if (!userID) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid userID' }).send()

            const updatedUser = await this.usersService.update({ ID: userID }, updateUserDto)

            res.status(HttpStatus.OK).json(updatedUser).send()
        } catch (error: any) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send()
        }
    }

    /* 
        Status :
            - 200 (OK) : data delete + message descriptif
            - 204 (NO_CONTENT) : data delete without message
            - 202 (ACCEPTED) : request confirmed but not delete yet
    */
    @Delete(':userID')
    async delete(@Res() res: Response, @Param('userID') paramUserID: any) {
        try {
            const userID = parsingInt(paramUserID)
            if (!userID) return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid userID' }).send()

            const deletedUser = await this.usersService.delete({ ID: userID })

            res.status(HttpStatus.NO_CONTENT).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send()
        }
    }
}