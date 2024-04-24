import { Secret } from "jsonwebtoken";

declare namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGODB_URL: string;
      JWT_SECRETKEY:any;
      PORT:number;
      NODE_ENV:string
      JWT_EXPIRE:string;
      API_KEY:Number;
      API_SECRET:any;
      CLOUD_NAME:any;
      // Add more variables as needed
    }
  }
  