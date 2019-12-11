import Res from './res'

const Ont = require('./../../static/lib/index');
const rpcClient = new Ont.RpcClient("http://10.0.1.201:20336");

import axios from 'axios';
import indexDB from './data/db/indexDb';
import Util from '../assets/tool/util';
// curent get transaction list

let transactionList = [];
let length = 0;
let addressObj = {}
const TRANSACTION_KEY_LENGTH = 50000;

/**
 * rewrite rpcClient function
 */
rpcClient.getsmartcodeeventbyeventidandheights = (contract, eventId, startHeight, endHeight, address) => {
  let req = makeRequest('getsmartcodeeventbyeventidandheights', contract, eventId, startHeight, endHeight, address)
  return axios.post('http://10.0.1.201:20336', req).then(Response => {
    return Response.data;
  })
}
rpcClient.getBlockHeight = () => {
  const req = makeRequest('getblockcount');
  return axios.post('http://10.0.1.201:20336', req).then(Response => {
    return Response.data;
  });
}
const makeRequest = (method, ...params) => {
  const request = {
    jsonrpc: '2.0',
    method,
    params,
    id: 1
  };
  return request;
}

import Service from './service/index'

class API {
  constructor () {
    this.rpcClient = rpcClient;
    this.service = new Service(this);
  }

  async getBlockHeight() {
    let res = await this.service.Block.getBlockHeight();
    return res;
  }

  async syncTransaction() {
    let res = new Res();
    if(transactionList.length > 0) {
      res.setResult(transactionList);
      return res.get();
    }
    let height = await this.getBlockHeight();
    let _heightCache = await indexDB.findData({
      indexDbName: 'transaction',
      key: 'height'
    });
    let _height = _heightCache.length === 0 ? 0 : _heightCache[_heightCache.length - 1].value;
    let transactionResult = await rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, (_height + 1), height, "");
    if(transactionResult.error !== 0) {
      res.setError(transactionResult.error);
      return res.get();
    }
    let transactionCacheList = [];
    if(transactionList.length === 0) {
      transactionCacheList = await this.getTransactionCacheList();
    }
    transactionList = transactionCacheList.concat(transactionResult.result);
    // if(getAddressCache)
    addressObj = this.getAddressCache();
    console.log("transactionList");
    toSyncTransaction({data: transactionResult.result});
    res.setResult(transactionList);
    return res.get();
  }

  async getAddressCache() {
    let _addressCacheList = await indexDB.findData({
      indexDbName: 'address',
      key: 'addressList'
    });
    let _addressList = _addressCacheList.length === 0 ? {} : _addressCacheList[_addressCacheList.length - 1].value;
    let _addressObj = Util.listToObj(_addressList);
    let result = {
      obj: _addressObj,
      list: _addressList
    }
    return result;
  }

  async getTransactionCacheList() {
    let _lengthCache = await indexDB.findData({
      indexDbName: 'transaction',
      key: 'length'
    });
    let _length = _lengthCache.length === 0 ? 0 : _lengthCache[_lengthCache.length - 1].value;
    let cacheTransactionDbNum = Math.ceil(_length / TRANSACTION_KEY_LENGTH);
    let arr = [];
    for(let i = 0;i <= cacheTransactionDbNum;i ++) {
      let dbStart = i * TRANSACTION_KEY_LENGTH;
      let dbName = `transaction_${dbStart}_to_${dbStart+TRANSACTION_KEY_LENGTH}`;
      let dbData = await indexDB.findData({
        indexDbName: 'transaction',
        key: dbName
      });
      arr = arr.concat(dbData);
    }
    return arr;
  }

  async getCountStat() {
    let result = await this.service.Stat.getCountStat();
    return result;
  }

  async getStorageStat() {
    let result = await this.service.Stat.getStorageStat();
    return result;
  }

  async getProfitStat({
    limit,
    type
  }) {
    if(type === 0) {
      let result = await this.service.Stat.getProfitStatByDay({days: limit});
      return result;
    } else {
      let result = await this.service.Stat.getProfitStatByMonth({months: limit});
      return result;
    }
  }

  async getFileState ({
    days
  }) {
    let result = await this.service.Stat.getFileState({days});
    return result;
  }

  
  async getChannelStat({
    days
  }) {
    let result = await this.service.Stat.getChannelStat({days});
    return result;
  }

  async getTransactionStat({
    days
  }) {
    let res = new Res();
    let currentheight = await this.getBlockHeight();
    let todayBlockNumber = this.service.Block.getTodayGoesBlockNumber();
    const commitAll = [];
    for (let i = 0; i < days; i++) {
      let endBlock;
      let startBlock = currentheight - todayBlockNumber - (17280 * i)
      if (i === 0) {
        endBlock = currentheight;
      } else {
        endBlock = startBlock + 17280;
      }
      commitAll.push(
        rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, startBlock, endBlock, "")
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
      let i = ResponseArr.length - 1;
      while (i >= 0) {
        let total = ResponseArr[i].result.length;
        arr.push({
          Total: total,
          UpdatedAt: 710000
        });

        --i;
      }
      res.setResult(arr);
      return res.get();
    })
  }

  async getStakeStat({
    days
  }) {
    let res = new Res();
    let currentheight = await this.getBlockHeight();
    let todayBlockNumber = this.service.Block.getTodayGoesBlockNumber();
    const commitAll = [];
    for (let i = 0; i < days; i++) {
      let endBlock;
      let startBlock = currentheight - todayBlockNumber - (17280 * i)
      if (i === 0) {
        endBlock = currentheight;
      } else {
        endBlock = startBlock + 17280;
      }
      if (i === days - 1) {
        startBlock = 1;
      }
      commitAll.push(
        rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvjPTx9sq', 1, startBlock, endBlock, "")
      );
      commitAll.push(
        rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvjPTx9sq', 2, startBlock, endBlock, "")
      )
    }

    return Promise.all(commitAll).then(ResponseArr => {
      console.log(ResponseArr);
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }

      let arr = [];
      let i = ResponseArr.length - 1;
      let registerObj = {};
      let currentTimestamp = Date.parse(new Date()) / 1000;
      while (i >= 0) {
        let total = 0;
        outFor1: for (let value of ResponseArr[i - 1].result) {
          for (let notify of value.Notify) {
            if (notify && Object.prototype.toString.call(notify['States']) === '[object Object]') {
              let _address = notify['States'].walletAddr.toString();
              if (registerObj[_address] === undefined) registerObj[_address] = [];
              registerObj[_address].push(notify['States'].deposit);
              continue outFor1;
            }
          }
        }

        outFor2: for (let value of ResponseArr[i].result) {
          for (let notify of value.Notify) {
            if (notify && Object.prototype.toString.call(notify['States']) === '[object Object]') {
              let _address = notify['States'].walletAddr.toString();
              if (registerObj[_address].length === 1) {
                delete registerObj[_address];
              } else {
                registerObj[_address].shift();
              }
              continue outFor2;
            }
          }
        }
        console.log('registerObj');
        console.log(registerObj);
        for (let key in registerObj) {
          let value = Util.sum(registerObj[key]);
          total += value;
        }
        total = total / Math.pow(10, 9);
        let _timestamp = currentTimestamp - (i * 43200);
        arr.unshift({
          DNSFormat: total,
          // TO DO!
          FSFormat: total,
          UpdatedAt: _timestamp
        })
        i = i - 2;
      }

      res.setResult(arr);
      return res.get();
    });
  }

  async getBlocks({
    offset,
    limit
  }) {
    let result = await this.service.Block.getBlocks({
      offset,
      limit  
    });
    return result;
  }

  async getTransactions({
    offset,
    limit
  }) {
    let res = new Res();
    let result;
    const vm = this;
    if (offset === 0) {
      result = transactionList.slice(-limit - offset);
    } else {
      result = transactionList.slice(-limit - offset, -offset);
    }
    // res.setResult(result);
    const commitAll = [];
    console.log(result);
    for (let value of result) {
      commitAll.unshift(
        rpcClient.getRawTransactionJson(value.TxHash)
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

      // TO DO!
      for (let Response of ResponseArr) {
        let Timestamp = await vm.service.Block.getTimestampByBlock(Response.result.Height);
        arr.push({
          Hash: Response.result.Hash,
          Height: Response.result.Height,
          Amount: "",
          Asset: "SAVE",
          From: "",
          To: "",
          Status: 1,
          CreatedAt: Timestamp
        })
      }
      let _result = {
        Detail: arr,
        Total: transactionList.length
      }
      res.setResult(_result);
      return res.get();
    });
  }

  async getBlockbyHeight(height) {
    let result = await this.Service.Block.getBlockHeight(height);
    return result;
  }

  async getRawTransactionJson({txHash}) {
    let res = new Res();
      let _result = await rpcClient.getRawTransactionJson(txHash);
      if(_result.error !== 0) {
        res.setError(_result.error);
        return res.get();
      }
      let timestamp = await this.service.Block.getTimestampByBlock(_result.result.Height);
      let result = {
        Hash: _result.result.Hash,
        Height: _result.result.Height,
        Amount: "",
        Asset: "SAVE",
        Fee: "0.01",
        Status: 1,
        Type: 0,
        CreatedAt: timestamp,
        Details: []
      }
      res.setResult(result);
      return res.get();
  }


}

// SYNC DATA;
// TO DO!
async function toSyncTransaction({
  data
}) {
  let _lengthRes = await indexDB.findData({
    indexDbName: 'transaction',
    key: 'length'
  });
  let _length = _lengthRes.length === 0 ? 0 : _lengthRes[_lengthRes.length - 1].value;
  let lastDbStart = parseInt(_length / TRANSACTION_KEY_LENGTH) * TRANSACTION_KEY_LENGTH;
  let lastDbName = `transaction_${lastDbStart}_to_${lastDbStart+TRANSACTION_KEY_LENGTH}`;
  let lastDb = await indexDB.findData({
    indexDbName: 'transaction',
    key: lastDbName
  });
  let arr = data.concat(lastDb);
  // insert data
  let dataArr = [];
  // Can be optimized;
  for (let i = lastDb.length; i < arr.length; i++) {
    if ((i + 1) % TRANSACTION_KEY_LENGTH === 0) {
      let waitDone = await indexDB.updateData({
        indexDbName: 'transaction',
        key: lastDbName,
        data: dataArr
      });
      lastDbStart += TRANSACTION_KEY_LENGTH;
      lastDbName = `transaction_${lastDbStart}_to_${lastDbStart+TRANSACTION_KEY_LENGTH}`;
      dataArr = [];
      // update transaction length;
      let waitDone2 = await indexDB.updateData({
        indexDbName: 'transaction',
        key: 'length',
        data: [{
          value: lastDbStart
        }]
      });
      let heigthByHashTx = await rpcClient.getBlockHeightByTxHash(arr[i].TxHash);
      let waitDone3 = await indexDB.updateData({
        indexDbName: 'transaction',
        key: 'height',
        data: [{
          value: heigthByHashTx.result
        }]
      })
    } else if (i === (arr.length - 1)) {
      let waitDone = await indexDB.insertData({
        indexDbName: 'transaction',
        key: lastDbName,
        data: dataArr
      });
      let waitDone2 = await indexDB.updateData({
        indexDbName: 'transaction',
        key: 'length',
        data: [{
          value: lastDbStart
        }]
      });
      let heigthByHashTx = await rpcClient.getBlockHeightByTxHash(arr[i].TxHash);
      let waitDone3 = await indexDB.updateData({
        indexDbName: 'transaction',
        key: 'height',
        data: [{
          value: heigthByHashTx.result
        }]
      })
    }
    dataArr.push({
      TxHash: arr[i].TxHash
    });
  }
}

export default API
