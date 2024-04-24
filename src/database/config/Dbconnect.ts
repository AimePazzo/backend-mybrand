import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
export const connectDB = async () => {
  const uri = process.env.MONGODB_URL;
  if (!uri) {
    console.error('MongoDB URI is not defined in the environment variables.');
    return; 
  }
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};