import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    
    @Post()
    async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
        try {
            console.log(createUserDto)
            const user = await this.usersService.create(createUserDto)
            res.status(HttpStatus.CREATED).json(user).send()
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }

    @Get()
    async findAll(@Res() res: Response) {
        try {
            const users = await this.usersService.findAll()
            console.log(users)
            res.status(HttpStatus.OK).json(users).send()
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