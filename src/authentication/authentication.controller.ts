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
import { Prisma, User } from '@prisma/client';
import { LoginUserDto } from './dto/login.dto';
import { Token } from './dto/result.dto';
import { hashPassword } from './utils';

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

    await this.authenticationService.isEmailUsed(registerUserDto.email)
  
    const userCreated: User = await this.authenticationService.registerUser(registerUserDto.email, registerUserDto.password)
    
    return {
      access_token: await this.authenticationService.signIn(
        userCreated.email,
        registerUserDto.password,
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
