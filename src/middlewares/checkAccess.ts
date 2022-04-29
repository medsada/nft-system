import {Request, Response, NextFunction } from 'express';
import customError from "../util/customError";
import { AccessControl } from "accesscontrol";

const ac = new AccessControl();
        // this configuration should in other file when the the project growth and will have more roles management
ac.grant('admin')   
    .deleteAny('nft')
    .readAny('nft')
    .updateAny('nft');

function checkAccess(actionResource: string) {
  return function check(req:Request, res:Response, next:NextFunction) {
    if (!res.locals.user || !res.locals.user.roles) throw new customError(400, "You have no role");
    const [action, resource] = actionResource.split(".");
    let permission = ac.permission({role:res.locals.user.roles, action: action, resource: resource});
    if (!permission.granted) throw new customError(403, "Your not authorized to this resource");
    next();
  };
}

export default checkAccess;