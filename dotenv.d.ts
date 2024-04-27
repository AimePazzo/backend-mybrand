import { Secret } from "jsonwebtoken";

declare namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      MONGODB_URL: string;
      JWT_SECRETKEY:any;
      PORT:number;
      NODE_ENV:string
      JWT_EXPIRE:string;
      API_KEY:string;
      API_SECRET:any;
      CLOUD_NAME:any;
      MAIL_ID:string;
      MP:string;
      SMTP_HOST_PORT:number;
      BASE_URL:string;
      // Add more variables as needed
    }
  }

  