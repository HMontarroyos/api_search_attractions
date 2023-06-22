import { Request, Response, NextFunction } from "express";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

class AuthMiddleware {
static authenticate(req: Request, res: Response, next: NextFunction): void {
    const providedKey = req.headers['key'];
  
    if (providedKey !== process.env.SECRET_KEY_API) {
      res.status(403).json({ message: 'Invalid api key.' });
    }
  
    next();
  } 
}


export default AuthMiddleware;
