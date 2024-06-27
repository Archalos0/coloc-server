import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TransformBirthdayMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log("middleware")
        if (req.body && req.body.birthday) {
            req.body.birthday = new Date(req.body.birthday);
        }
        next();
    }
}