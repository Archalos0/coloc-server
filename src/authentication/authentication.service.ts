import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { checkPassword, generateToken } from './utils';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({email: email});
    
    const isPasswordCorrect = await checkPassword(pass, user.password)

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('The association email/password does not match.');
    }

    const token = generateToken(user)
    return token;
  }
}
