import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register.dto';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login.dto';
import { Token } from './dto/result.dto';

const jwt = require('jsonwebtoken');

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UsersService,
  ) {}

  @ApiCreatedResponse({
    description:
      'The user has been created. The connection token to the API is provided.',
    type: Token,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<Token> {
    //check the password strength
    if (registerUserDto.password != registerUserDto.passwordValidator) {
      throw new UnauthorizedException('Passwords are differents');
    }

    const userWithSameEmail = await this.userService.findOne({email: registerUserDto.email});
    if (userWithSameEmail != null) {
      throw new UnauthorizedException('This email already exists in the database');
    }

    //use bcrypt
    const userData: Prisma.UserCreateInput = {
      email: registerUserDto.email,
      password: registerUserDto.password,
      firstName: '',
    };
    const userCreated = await this.userService.create(userData);
    console.log(userCreated)
    return {
      access_token: await this.authenticationService.signIn(
        userCreated.email,
        userCreated.password,
      ),
    };
  }

  @ApiOkResponse({
    description: 'The token needed to access the API',
    type: Token,
  })
  // @ApiUnauthorizedResponse(
  //   {
  //     description: 'Error when the connection data are wrong',
  //     type: UnauthorizedException
  //   }
  // )
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() signInDto: LoginUserDto): Promise<Token> {
    return {
      access_token: await this.authenticationService.signIn(
        signInDto.email,
        signInDto.password,
      ),
    };
  }
}
