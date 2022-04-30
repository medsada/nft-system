import {NextFunction, Request, Response } from 'express';
import NFTService from '../services/NFTService';
import Joi from 'joi';
import customError from "../util/customError";


const validateGetNFTs = {
    query: Joi.object(). keys ({
      contract_address: Joi.string().description("contract_address").error(new customError(400, "contract_address is string")),
      owner: Joi.string().description("owner").error(new customError(400, "owner is string")),
      creator: Joi.string().description("to").error(new customError(400, "creator is string")),
    }).error(new customError(400, "invalid data"))
}

const validateDeleteNFT = {
    body: Joi.object(). keys ({
      contract_address: Joi.string().description("contract_address").required().error(new customError(400, "contract_address is string")),
      token_id: Joi.number().min(0).description("token_id").required().error(new customError(400, "token_id is required positive number")),
    }).error(new customError(400, "invalid data"))
}


const getNFTs = async (req:Request, res:Response, next: NextFunction) => {
  try {

    req.query = await validateGetNFTs.query.validateAsync(req.query);

    const nftList = await NFTService.getNFTListToAdmin(req.query.contract_address?.toString(), req.query.owner?.toString(), req.query.creator?.toString());
    res.json({success:true, nftList})

  } catch (e) {
    next(e)
  }
}

const deleteNFT = async (req:Request, res:Response, next: NextFunction) => {
  try {
    
    req.body = await validateDeleteNFT.body.validateAsync(req.body);
    
    const deletedNFT = await NFTService.deleteNFTByAdmin(req.body.contract_address, req.body.token_id);
    console.log(res.locals.user.user_id + " has deleted the nft " + req.body.contract_address + "  " + req.body.token_id);
    res.json({success:true, deletedNFT})

  } catch (e) {
      next(e)
  }
}

export { getNFTs, deleteNFT };