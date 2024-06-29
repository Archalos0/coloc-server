import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthenticationService {

    constructor(private prisma: PrismaService) { }

    //Generate token

    //refresh token
}
