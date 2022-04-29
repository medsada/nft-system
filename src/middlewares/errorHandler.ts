import {Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import customError from "../util/customError";

import log4js from "log4js";
const logger = log4js.getLogger("cheese");


const errorHandler: ErrorRequestHandler = (err:customError, req:Request, res:Response, next:NextFunction) => {
    console.log(err)
    if (!err.status) {
      console.log("haaaaaa")  
      err.status = 500;
      console.log("hooooo")
      logger.error(err.status + err.message);
      res.status(err.status).send("INTERNAL_SERVER_ERROR");
    }
    else res.status(err.status).send(err.message);

};
  
export default errorHandler;