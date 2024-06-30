import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { generateToken } from './utils';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({email: email});
    
    if (user?.password !== pass) {
      throw new UnauthorizedException('The association email/password does not match.');
    }

    const token = generateToken(user)
    return token;
  }

  //Generate token

  //refresh token
}
