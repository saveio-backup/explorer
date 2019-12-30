import Base from './Base'
class Block extends Base {
  constructor(context) {
    super(context);
    this.zeroTimestamp;
    this.cacheTimestampByHeight = {}
  }

  /**
   * get current block height
   * @return {Number} current block height
   */
  async getBlockHeight() {
    let res = await this.rpcClient.getBlockHeight();
    let height = res.result;
    return height;
  }

  /**
   * get block generate timestamp by block height
   * @param {Number} height 
   * @return {Number} block timestamp
   */
  async getTimestampByBlock(height) {
    if(!this.zeroTimestamp) {
      let currentheight = await this.getBlockHeight();
      let currentTimestamp = Date.parse(new Date()) / 1000;
      this.zeroTimestamp = currentTimestamp - (currentheight * 5);
    }
    let timestamp = this.zeroTimestamp + (height * 5);
    return timestamp;
  }

  /**
   * @param {Number} height 
   * @return {Res} block info
   */
  async getBlockbyHeight(height) {
    let res = new this.Res();
      let result = await this.rpcClient.getBlockJson(height)
      if (result.error !== 0) {
        res.setError(Response.error);
        return res.get();
      };
      let blockInfo = result.result;
      let _timestamp = await this.getTimestampByBlock(height);
      let _result = {
        Hash: blockInfo.Hash,
        Height: blockInfo.Header.Height,
        TxCount: blockInfo.Transactions.length,
        Size: blockInfo.Size,
        Miner: blockInfo.Header.Bookkeepers[blockInfo.Header.Bookkeepers.length - 1],
        Status: 1,
        CreatedAt: _timestamp
      }
      console.log(_result);
      res.setResult(_result);
      return res.get();
    // })
  }

  /**
   * get block list by offset and limit
   * @param {Number} offset
   * @param {Number} limit
   * @return {Res} block list 
   */
  async getBlocks({offset, limit}) {
    const vm = this;
    let res = new this.Res();
    let currentheight = await this.getBlockHeight();
    const commitAll = [];
    for (let i = 0; i < limit; i++) {
      if ((currentheight - offset - i) === 0) break;
      commitAll.push(
        vm.rpcClient.getBlockJson((currentheight - offset - i))
      )
    }
    return Promise.all(commitAll).then(ResponseArr => {
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }

      let arr = [];
      for (let value of ResponseArr) {
        arr.push({
          Height: value.result.Header.Height,
          TxCount: value.result.Transactions.length,
          Size: value.result.Size,
          Miner: "xxx",
          Status: 1,
          CreatedAt: value.result.Header.Timestamp
        })
      }
      let _result = {
        Total: currentheight,
        Detail: arr
      }
      res.setResult(_result);
      return res.get();
    });
  }

  /**
   * today goes block number
   * @return {Number} block number
   */
  getTodayGoesBlockNumber() {
    let _endTimestamp = Date.parse(new Date()) / 1000;
    let currentTime = _endTimestamp % 86400;
    let blockNum = parseInt(currentTime / 5);
    return blockNum;
  }

  /**
   * 
   * @param {Number} num 
   */
  geMonthGoesBlockNumber(num) {
    console.log(num);
    let date = new Date();
    var y = date.getFullYear(); 
    var m = date.getMonth() + 1;
    y -= parseInt(num / 12);
    y -= ((m - (num % 12)) > 0 ? 0: 1);
    m = (((m + 12 - 1) - (num % 12)) % 12);
    date.setFullYear(y);
    date.setMonth(m);
    date.setDate(1);
    date.setHours(0);
    date.setSeconds(0);
    date.setMinutes(0);
    let _monthTimestamp = date.getTime() / 1000;
    let currentTime = (new Date()).getTime()/1000;
    let goesTimestamp = currentTime - _monthTimestamp;
    let blockNum = parseInt(goesTimestamp / 5);
    return blockNum;
  }
}
export default Block;