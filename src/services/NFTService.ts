import NFTModel from '../models/NFTModel'
import customError from "../util/customError";


class NFTService {

    Model:typeof NFTModel;
    constructor(Model: typeof NFTModel) {
      this.Model = Model;
    }

    async createNewNFT(nft:Object) {
      return await this.Model.create({...nft,status:"active"});
    }
  
    async checkUnicity(contract_address: String, token_id: Number) {
      const nft = await this.Model.findOne({ contract_address: contract_address, token_id: token_id });
      if(nft) throw new customError(400, "NFT exist with the same combination of contract_address and token_id");
      return;
    }
  

    async updateTransfer(contract_address: String,
                        token_id: Number,
                        to: String,
                        from: String,
                        block_number: Number) {

        const nft = await this.Model.findOne({ contract_address: contract_address, token_id: token_id, owner: from, status:{$ne:"deleted"} });
        if(!nft) throw new customError(400, "NFT not found");

        if(nft.block_number >= block_number) throw new customError(400, "past block_number is higher than the actual");

        nft.owner = to;
        nft.block_number = block_number;

        await nft.save();
        return nft;
    }
  

}
  
  export default new NFTService(NFTModel);