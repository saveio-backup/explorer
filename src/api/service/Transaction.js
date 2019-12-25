import Base from './Base'
class Transaction extends Base {
  constructor(context) {
    super(context)
    this.transactionList = [];
    this.syncLoading;
  }

  /**
   * get transaction list by height;
   * @param {Number} height 
   * @return {Res} blokc transaction list
   */
  async getTransactionbyHeight(height) {
    let res = new this.Res();
    let result = await this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, height, (height + 1), "");
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
              Amount: (item.States[3] / Math.pow(10, 9)),
              Asset: "ONI",
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

  /**
   * get detail address detail(include transaction list)
   * @param {String} address 
   * @return {Res} address detail info(include transaction list)
   */
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
        for (let i = 0;i < transaction.Notify.length;i ++) {
          let item = transaction.Notify[i];
          if (item && Object.prototype.toString.call(item.States) === '[object Array]') {
            if (item.States[0] === 'transfer') {
              let _timestamp = await this.context.service.Block.getTimestampByBlock(item.States[4]);
              arr.unshift({
                Hash: transaction.TxHash,
                Amount: (item.States[3] / Math.pow(10, 9)),
                Asset: "ONI",
                From: item.States[1],
                To: item.States[2],
                CreatedAt: _timestamp
              });
              if (item.States[1] === address) {
                balance -= item.States[3]
              } else if (item.States[2] === address) {
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
        BalanceFormat: (balance / Math.pow(10, 9)),
        ChannelCount: (ResponseArr[1].result.length - ResponseArr[2].result.length),
        TxCount: arr.length,
        CreatedAt: timestamp,
      }
      res.setResult(_result);
      return res.get();
    })
  }

  /**
   * get tx detail info(include transaction list)
   * @param {String} txHash
   * @return {Res} tx detail info(include transaction list)
   */
  async getRawTransactionJson(txHash) {
    let res = new this.Res();
    let _result = await this.rpcClient.getRawTransactionJson(txHash);
    if (_result.error !== 0) {
      res.setError(_result.error);
      return res.get();
    }

    let details = await this.getTransferListByHeightAndTxhash(_result.result.Height, txHash);
    let timestamp = await this.context.service.Block.getTimestampByBlock(_result.result.Height);
    let result = {
      Hash: _result.result.Hash,
      Height: _result.result.Height,
      Amount: "",
      Asset: "ONI",
      Fee: "0.01",
      Status: 1,
      Type: 0,
      CreatedAt: timestamp,
      Details: details
    }
    res.setResult(result);
    return res.get();
  }

  /**
   * get transfer list by height and tx hash
   * @param {String} height 
   * @param {String} txHash 
   * @return {Array} transfer list
   */
  async getTransferListByHeightAndTxhash(height, txHash) {
    let res = await this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, height, (height + 1), "");
    let transactionList = res.result;
    let arr = [];
    for (let transaction of transactionList) {
      if (transaction.TxHash !== txHash) continue;
      for (let item of transaction.Notify) {
        if (item && Object.prototype.toString.call(item.States) === '[object Array]') {
          if (item.States[0] === 'transfer') {
            arr.push({
              Amount: (item.States[3] / Math.pow(10, 9)),
              Asset: "ONI",
              From: item.States[1],
              To: item.States[2],
            })
          }
        }
      }
    }
    return arr;
  }

  async getTransactions({
    offset,
    limit
  }) {
    const vm = this;
    let res = new this.Res();
    let result = await this.context.cache.sync.getTransactionsTx({
      offset,
      limit
    })
    const commitAll = [];
    for (let value of result) {
      commitAll.unshift(
        vm.rpcClient.getSmartCodeEvent(value.TxHash)
      )
    }

    return Promise.all(commitAll).then(async ResponseArr => {
      console.log('ResponseArr')
      console.log(ResponseArr)
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }

      let arr = [];
      for (let Response of ResponseArr) {
        let _height,amount = 0,from,to;
        for(let i = 0;i < Response.result.Notify.length; i ++) {
          let item = Response.result.Notify[i].States;
          if(Object.prototype.toString.call(item) === '[object Object]' && item.blockHeight) {
            _height = item.blockHeight;
          } else if(Object.prototype.toString.call(item) === '[object Array]' && item[0] === 'transfer') {
            if(item[3] > amount) {
              amount = item[3];
              from = item[1];
              to = item[2];
            }
          }
        }

        if(_height === undefined || _height === 0) {
          let _heightRes = await vm.rpcClient.getBlockHeightByTxHash(Response.result.TxHash);
          _height = _heightRes.result;
        }
        let timestamp = await vm.context.service.Block.getTimestampByBlock(_height);
        arr.push({
          Hash: Response.result.TxHash,
          Height: _height,
          Amount: amount/Math.pow(10, 9),
          Asset: "ONI",
          From: from,
          To: to,
          Status: 1,
          CreatedAt: timestamp
        })
      }
      let _result = {
        Detail: arr,
        Total: vm.context.cache.sync.txCache.total
      }
      res.setResult(_result);
      return res.get();
    });
  }

  async getAddressLength() {
    let res = new this.Res();
    let result = await this.context.cache.sync.getAddressList();
    res.setResult(result.length);
    return res.get();
  }

  async getTransactionStat({
    days = 100000
  }) {
    let res = new this.Res();
    let result = await this.context.cache.sync.getDayTransactionList();
    let _result = result.slice(-days);
    _result.reverse();
    let arr = [];
    let currentTimestamp = Date.parse(new Date()) / 1000;
    let i = _result.length - 1;
    while (i >= 0) {
      let item = _result[i] || 0;
      let _timestamp = currentTimestamp - (i * 86400);
      arr.unshift({
        Onchain: item,
        Offchain: 0,
        UpdatedAt: _timestamp
      });
      i--;
    }
    res.setResult(arr);
    return res.get();
  }
}

export default Transaction;
