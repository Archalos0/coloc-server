import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register.dto';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login.dto';
import { generateToken } from './utils';

const jwt = require("jsonwebtoken")

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService, private userService: UsersService) {}

  @Post("/register")
  async register(@Res() res: Response, @Body() registerUserDto: RegisterUserDto) {
    try {
        //check the password strength
        if(registerUserDto.password != registerUserDto.passwordValidator) {
            res.status(HttpStatus.UNAUTHORIZED).json({error : "Passwords are differents"})
            return
        }

        const userWithSameEmail = await this.userService.findOne({email: registerUserDto.email})
        if(userWithSameEmail != null ) {
            res.status(HttpStatus.UNAUTHORIZED).json({error: "This email already exists in the database"})
            return
        }

        //use bcrypt
        const userData: Prisma.UserCreateInput = {email: registerUserDto.email, password: registerUserDto.password, firstName: ""}
        const userCreated = await this.userService.create(userData)
               
        res.status(HttpStatus.CREATED).json({data: userCreated})
    
    } catch (error: any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  }

  @Post("/login")
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.findOne({email: loginUserDto.email})
      if(user == null) {
        res.status(HttpStatus.UNAUTHORIZED).json({error : "This email does not exists in database"})
        return
      }

      //use bcrypt
      if(user.password != loginUserDto.password) {
        res.status(HttpStatus.UNAUTHORIZED).json({error : "The association email / password is incorrect"})
        return
      }

      const token = generateToken(user)

      console.log(token)
      //send token
      res.status(HttpStatus.OK).json({data : token})

    } catch (error : any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error })
    }
  }
}
