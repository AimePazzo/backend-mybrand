import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();
import jwt, { Secret } from 'jsonwebtoken';
import userRepository from '../modules/user/repository/userRepository';

  interface ExtendedRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: 'No token provided' });
  }

  const jwtSecret: Secret | undefined = process.env.JWT_SECRETKEY;

  if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret is not defined' });
  }

  jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Failed to authenticate token' });
      } else {
          const userId = (decoded as any).id;
          const user  =  await userRepository.getUserById(userId);
          if (!user) {
              return res.status(401).json({ error: 'User ID not found in token' });
          }
          req.user = user;
          next();
      }
  });
};



const isAdmin = asyncHandler(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { email } = req.user;

  try {
    const adminUser = await userRepository.loginUser( email );
    if (!adminUser || adminUser.role !== "admin") {
      throw new Error('You are not an admin');
    } else {
      next();
    }
  } catch (error) {
    // Handle database query or other errors
    next(error);
  }
});

export default { authenticateToken, isAdmin };
