import NFTModel from '../models/NFTModel'
import customError from "../util/customError";


class NFTService {

    Model:typeof NFTModel;
    constructor(Model: typeof NFTModel) {
      this.Model = Model;
    }

    async createNewNFT(nft: any) {
      return await this.Model.create({...nft,status:"active"});
    }
  
    async checkUnicity(contract_address: string, token_id: number) {
      const nft = await this.Model.findOne({ contract_address: contract_address, token_id: token_id });
      if(nft) throw new customError(400, "NFT exist with the same combination of contract_address and token_id");
      return;
    }
  

    async updateTransfer(contract_address: String,
                        token_id: number,
                        to: string,
                        from: string,
                        block_number: number) {

        const nft = await this.Model.findOne({ contract_address: contract_address, token_id: token_id, owner: from, status:{$ne:"deleted"} });
        if(!nft) throw new customError(400, "NFT not found");

        if(nft.block_number >= block_number) throw new customError(400, "past block_number is higher than the actual");

        nft.owner = to;
        nft.block_number = block_number;

        await nft.save();
        return nft;
    }


    async getNFTListToAdmin(contract_address?: string , owner?: string , creator?: string){

      interface Ifilter {
        contract_address?: string,
        owner?: string,
        creator?: string
      }

      const query:Ifilter = {};

      if(contract_address) query.contract_address = contract_address;

      if(owner) query.owner = owner;

      if(creator) query.creator = creator;

      console.log(query)
      const nfts = await this.Model.find({...query,status: {$ne:"deleted"}});
      console.log(nfts)
      return nfts;
    }
  
    async deleteNFTByAdmin(contract_address: string, token_id: number) {
      return await this.Model.findOneAndUpdate({contract_address, token_id}, {$set: {status: "deleted"}}, {new: true});
    }
}
  
  export default new NFTService(NFTModel);