import { Injectable, NestMiddleware } from '@nestjs/common';
import { verifyToken as checkToken } from './utils';
const jwt = require('jsonwebtoken');

@Injectable()
export class verifyToken implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.warn("checking token")
    const token: string = req.header('Authorization');
    console.log(req)
    console.log(token)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
      const decoded = checkToken(token.replace("Bearer ", ''));
      req.userId = decoded.ID;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
}
