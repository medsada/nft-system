import {Request, Response } from 'express';
import NFTService from '../services/NFTService';


const transferNFT = async (req:Request, res:Response) => {
    if(!req.body.from){
        req.body.creator = req.body.to;
        req.body.owner = req.body.to;
        const newNFT = await NFTService.createNewNFT(req.body);
        res.json({success:"yes",newNFT})
    }
    //res.json({success:"yes"})
}

export { transferNFT };