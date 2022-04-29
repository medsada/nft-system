import { verify } from "jsonwebtoken";
import {Request, Response, NextFunction } from 'express';
import customError from "../util/customError";

const jwt_key:string = process.env.JWT_AUTH_SECRET || "";


const getAuthorizationToken = (authorization:string) => {
    if (!authorization || !authorization.split(" ")[1]) {
      return "undefined";
    }
    return authorization.split(" ")[1];
};

const jwtMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    
    let { authorization } = req.headers;
    let token = getAuthorizationToken(authorization||"");
    try {
      let payload;
      payload = verify(token, jwt_key);
      res.locals.user = payload;
    } catch (e) {
        const err = new customError(401, "Login is required");
        next(err);
    }
    next();
  };

  export default jwtMiddleware;