import express from 'express';
const router = express.Router();

import { transferNFT } from '../controllers/nftController';

router.post('/transfer', transferNFT);

export default router;