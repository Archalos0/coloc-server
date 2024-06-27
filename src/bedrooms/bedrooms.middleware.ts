import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CreateBedroomMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log("bedroom middleware")
        if (req.body && req.body.houseID) {
            req.body.house = { connect : {ID: req.body.houseID}}
            req.body.houseID = null
        }
        next();
    }
}