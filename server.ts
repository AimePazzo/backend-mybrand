import express, { Express, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import dotenv from'dotenv';
import {errorHandler, notFound} from './src/middlewares/errorHandler';
import { connectDB } from './src/database/config/Dbconnect';
import router from './src/routers';
import cors from 'cors'
import morgan from 'morgan'

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/v1/',router)

app.get('/', (req:Request,res:Response)=>{
  res.status(200).json({
    message: 'Welcome to my brand API'
  })
})

app.use(notFound);
app.use(errorHandler);
const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server is running on Port:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  };
  
  startServer();

  export default app