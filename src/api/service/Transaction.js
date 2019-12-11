import Base from './Base'
class Transaction extends Base {
  constructor(context) {
    super(context)
  }

  async getTransactionbyHeight(height) {
    let res = new this.Res();
    let result = await this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, height, height, "");
    if (result.error !== 0) {
      res.setError(Response.error);
      return res.get();
    };
    let transactionList = result.result;
    let arr = [];
    for (let transaction of transactionList) {
      for (let item of transaction.Notify) {
        if (item && Object.prototype.toString.call(item.States) === '[object Array]') {
          if (item.States[0] === 'transfer') {
            arr.push({
              Hash: transaction.TxHash,
              Amount: (item.States[3]/Math.pow(10, 9)),
              Asset: "SAVE",
              From: item.States[1],
              To: item.States[2],
            })
          }
        }
      }
    }
    res.setResult(arr);
    return res.get();
  }

  async getTransactionByAddress(address) {
    const vm = this;
    let res = new this.Res();
    let height = await this.context.service.Block.getBlockHeight();
    return Promise.all([
      this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, 1, height, address),
      this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 1, 1, height, address),
      this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 2, 1, height, address),
    ]).then(async ResponseArr => {
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }
      let transactionList = ResponseArr[0].result;
      let arr = [];
      let balance = 0;
      for (let transaction of transactionList) {
        for (let item of transaction.Notify) {
          if (item && Object.prototype.toString.call(item.States) === '[object Array]') {
            if (item.States[0] === 'transfer') {
              arr.push({
                Hash: transaction.TxHash,
                Amount: (item.States[3]/Math.pow(10, 9)),
                Asset: "SAVE",
                From: item.States[1],
                To: item.States[2]
              });
              if(item.States[1] === address) {
                balance -= item.States[3]
              } else if(item.States[2] === address) {
                balance += item.States[3]
              }
            }
          }
        }
      }
      
      let firstTransactionBlock = await vm.rpcClient.getBlockHeightByTxHash(arr[0].Hash);
      let timestamp = await this.context.service.Block.getTimestampByBlock(firstTransactionBlock.result);
      
      let _result = {
        Txs: arr,
        BalanceFormat: (balance/Math.pow(10, 9)),
        ChannelCount: (ResponseArr[1].result.length - ResponseArr[2].result.length),
        TxCount: arr.length,
        CreatedAt: timestamp,
      }
      console.log(_result);
      res.setResult(_result);
      return res.get();
    })
  }

  async getRawTransactionJson(txHash) {
    let res = new this.Res();
    let _result = await this.rpcClient.getRawTransactionJson(txHash);
    if(_result.error !== 0) {
      res.setError(_result.error);
      return res.get();
    }
    
    let details = await this.getEventListByHeight(_result.result.Height, txHash);
    let timestamp = await this.context.service.Block.getTimestampByBlock(_result.result.Height);
    let result = {
      Hash: _result.result.Hash,
      Height: _result.result.Height,
      Amount: "",
      Asset: "SAVE",
      Fee: "0.01",
      Status: 1,
      Type: 0,
      CreatedAt: timestamp,
      Details: details
    }
    res.setResult(result);
    return res.get();
  }

  async getEventListByHeight(height, txHash) {
    let res = await this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, height, height, "");
    let transactionList = res.result;
    let arr = [];
    for (let transaction of transactionList) {
      if(transaction.TxHash !== txHash) continue;
      for (let item of transaction.Notify) {
        if (item && Object.prototype.toString.call(item.States) === '[object Array]') {
          if (item.States[0] === 'transfer') {
            arr.push({
              Amount: (item.States[3]/Math.pow(10, 9)),
              Asset: "SAVE",
              From: item.States[1],
              To: item.States[2],
            })
          }
        }
      }
    }
    return arr;
  }
}

export default Transaction;
