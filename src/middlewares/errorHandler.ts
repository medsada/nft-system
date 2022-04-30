import {Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import customError from "../util/customError";



const errorHandler: ErrorRequestHandler = (err:customError, req:Request, res:Response, next:NextFunction) => {
    
    if (!err.status) { 
      err.status = 500;
      console.log(err.status + err.message);
      res.status(err.status).send("INTERNAL_SERVER_ERROR");
    }
    else res.status(err.status).json({succes:false, error:err.message});

};
  
export default errorHandler;