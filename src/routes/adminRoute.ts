import express from 'express';
const router = express.Router();
import checkAccess from '../middlewares/checkAccess';
import { getNFTs, deleteNFT } from '../controllers/admincontroller';

router.get('/nft', checkAccess("read:any.nft"), getNFTs);

router.delete('/nft/:nftId', checkAccess("delete:any.nft"), deleteNFT);

export default router;