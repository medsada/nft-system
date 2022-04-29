import {Request, Response } from 'express';


const getNFTs = async (req:Request, res:Response) => {
    console.log(req.query);
    res.json({success:"yes"})
}
const deleteNFT = async (req:Request, res:Response) => {
    console.log("hhh");
    console.log(req.params.nftId)
    res.json({success:"yes"})
}

export { getNFTs, deleteNFT };