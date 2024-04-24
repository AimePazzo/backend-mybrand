import { Request,Response,NextFunction} from "express";
export const  notFound = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
  };

export  const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      status: "fail",
      message: err instanceof Error ? err.message : "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? "🥞" : err?.stack, 
    });
  };