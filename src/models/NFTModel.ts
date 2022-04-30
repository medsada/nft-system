import { Schema, model} from "mongoose";
import INFT from '../interfaces/NFTInterface'

const nftSchema = new Schema<INFT>({
    contract_address: {type: String, required: true},
    token_id: {type: Number, required: true},
    owner: {type: String, required: true},
    creator: {type: String, required: true},
    block_number: {type: Number, required: true},
    status: {type: String, required: true},
    },
    {
    timestamps: true,
    }
);

const NFTModel = model<INFT>("NFT", nftSchema);
export default NFTModel;