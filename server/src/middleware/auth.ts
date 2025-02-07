import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  
  // get the authorization header
  const authHeader = req.headers.authorization;

  // Check if auth is present
  if(authHeader){
    const token = authHeader.split(' ')[1];

  //Obtain secret key
  const secretKey = process.env.JWT_SECRET_KEY || '';
  
  // Verify the JWT Token
  jwt.verify(token, secretKey, (err, user) => {
    if(err){
      return res.sendStatus(403);
    }

    // Attaching user to the request
    req.user = user as JwtPayload;
    return next();
  })
  }else{
    // Unauthorized status if auth header is absent
    res.sendStatus(401);
  };
};
