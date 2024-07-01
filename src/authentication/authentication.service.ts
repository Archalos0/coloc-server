import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { checkPassword, generateToken, hashPassword } from './utils';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async isEmailUsed(email: string) {
    const userFound = await this.userService.findOne({ email: email });
    if (userFound != null) {
      throw new UnauthorizedException(
        'This email already exists in the database',
      );
    }
  }

  async registerUser(email: string, password: string): Promise<User> {
    try {
      const encryptedPassword = await hashPassword(password);
      const userData: Prisma.UserCreateInput = {
        email: email,
        password: encryptedPassword,
        firstName: '',
      };
      const userCreated: User = await this.userService.create(userData);

      return userCreated;
      
    } catch (error: any) {
      throw new InternalServerErrorException()
    }
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email: email });

    if(!user) throw new UnauthorizedException('The email does not exists in database')

    const isPasswordCorrect = await checkPassword(pass, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        'The association email/password does not match.',
      );
    }

    const token = generateToken(user);
    return token;
  }
}
