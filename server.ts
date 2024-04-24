import express, { Express, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import dotenv from'dotenv';
import {errorHandler, notFound} from './src/middlewares/errorHandler';
import { connectDB } from './src/database/config/Dbconnect';
import router from './src/routers';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/v1/',router)

app.use(notFound);
app.use(errorHandler);
const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  };
  
  startServer();