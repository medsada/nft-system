import {Request, Response, NextFunction } from 'express';
import NFTService from '../services/NFTService';
import Joi from 'joi';
import customError from "../util/customError";

// Validators
const validateTransferNFT = {
  body: Joi.object(). keys ({
    contract_address: Joi.string().description("contract_address").required().error(new customError(400, "contract_address is required string")), 
    token_id: Joi.number().min(0).description("token_id").required().error(new customError(400, "token_id is required positive number")),
    from: Joi.string().description("from").error(new customError(400, "from is string")),
    to: Joi.string().description("to").required().error(new customError(400, "to is required string")),
    block_number: Joi.number().min(0).description("block_number").required().error(new customError(400, "block_number is required positive number")),
  })
}


const transferNFT = async (req:Request, res:Response, next: NextFunction) => {
  try {

    req.body = await validateTransferNFT.body.validateAsync(req.body);
      
    if(!req.body.from){
        await NFTService.checkUnicity(req.body.contract_address, req.body.token_id)
        req.body.creator = req.body.to;
        req.body.owner = req.body.to;
        const newNFT = await NFTService.createNewNFT(req.body);
        return res.json({success:true,newNFT});

    }else {

        const updatedNFT = await NFTService.updateTransfer(req.body.contract_address,
                                                    req.body.token_id,
                                                    req.body.to,
                                                    req.body.from,
                                                    req.body.block_number);
        return res.json({success:true,updatedNFT})
    }

  } catch(e){
      next(e)
  }
}

export { transferNFT };