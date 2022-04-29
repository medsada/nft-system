import {Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';
import NFTService from '../services/NFTService';


const transferNFT = async (req:Request, res:Response, next: NextFunction) => {
  try {
      
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