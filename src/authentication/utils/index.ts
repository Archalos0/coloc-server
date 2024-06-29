const jwt = require('jsonwebtoken');

const SECRET_TOKEN_KEY = '7E263706U0ZN7G1IN2P690P35KMKTY20904XA6T1Z7SK9WDD4BE5RO0DYFMW8IW00V59Z0XV5AM9M39K9HTF78998E51EP3L91H5';
const EXPIRATION_TIME = '1h';

export function generateToken(data: any): string {
  return jwt.sign(
    {
      data: data,
    },
    SECRET_TOKEN_KEY,
    { expiresIn: EXPIRATION_TIME },
  );
}

export function verifyToken(token: string): any {
    return jwt.verify(token, SECRET_TOKEN_KEY)
}
