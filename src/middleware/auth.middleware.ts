import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      req.user = decoded.id;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
