import 'dotenv/config';
import express, { Express } from 'express';
import connectDB from './dbConnection';

import jwtMiddleware from './middlewares/jwt';
import errorHandler from './middlewares/errorHandler';

import adminRouter from './routes/adminRoute'
import nftRouter from './routes/nftRoute'

const app: Express = express();
app.use(express.json());

app.use('/admin', jwtMiddleware, adminRouter);

app.use('/api/nft',  nftRouter);

app.use(errorHandler)

const port: string = process.env.PORT || '5050';

connectDB()

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});