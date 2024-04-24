import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (id: string) => {
  if (!process.env.JWT_SECRETKEY || !process.env.JWT_EXPIRE) {
    throw new Error('JWT secret key or expire time not defined in environment variables.');
  }

  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

