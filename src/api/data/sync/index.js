const TRANSACTION_KEY_LENGTH = 50000;
import Base from './../../service/Base';
import IndexDB from './../db/indexDb'
class Sync extends Base {
  constructor(context) {
    super(context);
    this.indexDB = new IndexDB();

    this.transactionList = [];
    this.dayTransaction = [];
    this.addressObj = {};
    this.loading = {
      transation: false,
      address: false
    }
    this.firstDayZeroGoesBlockHeight = 0;
    this.init();
  }

  async init() {
    setTimeout(() => {
      this.syncTransaction();
    }, 1000)
    await this.updateTodayZeroGoesBlockHeight();  
  }
  
  async updateTodayZeroGoesBlockHeight() {
    let currentBlock = await this.context.service.Block.getBlockHeight();
    let todayZeroGoesBlockHeight = this.context.service.Block.getTodayGoesBlockNumber();
    this.firstDayZeroGoesBlockHeight = (currentBlock - todayZeroGoesBlockHeight)%(86400/5);
  }

  async getTransactionCacheList2() {
    let _lengthCache = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: 'length'
    });
    _lengthCache = _lengthCache.length === 0 ? 0 : _lengthCache[_lengthCache.length - 1].value;
    let cacheTransactionDbNum = Math.ceil(_lengthCache / TRANSACTION_KEY_LENGTH);
    let arr = [];
    for(let i = 0;i <= cacheTransactionDbNum;i ++) {
      let dbStart = i * TRANSACTION_KEY_LENGTH;
      let dbName = `transaction_${dbStart}_to_${dbStart+TRANSACTION_KEY_LENGTH}`;
      let dbData = await this.indexDB.findData({
        indexDbName: 'transaction',
        key: dbName
      });
      arr = arr.concat(dbData);
    }
    return arr;
  }

  async getTransactionCacheList() {
    let _lengthCache = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: 'length'
    });
    _lengthCache = _lengthCache.length === 0 ? 0 : _lengthCache[_lengthCache.length - 1].value;
    let cacheTransactionDbNum = Math.ceil(_lengthCache / TRANSACTION_KEY_LENGTH);
    // let NAME = 'transaction_list'
    let arr = [];
    for(let i = 0;i <= cacheTransactionDbNum;i ++) {
      let dbStart = i * TRANSACTION_KEY_LENGTH;
      let dbName = `transaction_${dbStart}_to_${dbStart+TRANSACTION_KEY_LENGTH}`;
      let dbData = await this.indexDB.findData({
        indexDbName: 'transaction',
        key: dbName
      });
      arr = arr.concat(dbData);
    }
    return arr;
  }

  async getDayTransactionCache() {
    if(this.dayTransaction.length > 0) {
      return this.dayTransaction;
    }
    let _dayTransactionCacheList = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: 'dayTransaction'
    });
    return _dayTransactionCacheList;
  }

  async getAddressCache() {
    if(this.addressObj.obj) {
      return this.addressObj
    }
    let _addressCacheList = await this.indexDB.findData({
      indexDbName: 'address',
      key: 'addressList'
    });
    // _addressCacheList = _addressCacheList.length === 0 ? [] : _addressCacheList;
    let _addressObj = this.context.Util.listToObj(_addressCacheList);
    let result = {
      obj: _addressObj,
      list: _addressCacheList
    }
    return result;
  }


  async getTransactionsTx({
    offset,
    limit
  }) {
    return new Promise((resolve,reject) => {
      let obj = setInterval(() => {
        if(this.loading.transation !== true) {
          let result;
          if (offset === 0) {
            result = this.transactionList.slice(-limit - offset);
          } else {
            result = this.transactionList.slice(-limit - offset, -offset);
          }
          clearInterval(obj);
          resolve(result);
        }
      }, 1000)
    });
  }

  async syncTransaction() {
    if(this.loading.transation === true) {
      return false;
    }
    this.loading.transation = true;
    if(this.transactionList.length > 0) {
      return this.transactionList;
    }

    // let height = 500000;
    let height = await this.context.service.Block.getBlockHeight();
    let _heightCache = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: 'height'
    });
    _heightCache = _heightCache.length === 0 ? 0 : _heightCache[_heightCache.length - 1].value;
    let transactionResult = await this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, (_heightCache + 1), height, "");
    if(transactionResult.error !== 0) {
      return transactionResult.error;
    }
    let transactionCacheList = [];
    if(this.transactionList.length === 0) {
      transactionCacheList = await this.getTransactionCacheList();
    }
    this.transactionList = transactionCacheList.concat(transactionResult.result);

    this.loading.transation = false;
    this.toSyncTransaction({data: transactionResult.result});
    return this.transactionList;
  }

  async toSyncTransaction({
    data
  }) {
    this.loading.address = true;
    this.addressObj = await this.getAddressCache();
    this.dayTransaction = await this.getDayTransactionCache();

    let _lengthCache = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: 'length'
    });
    _lengthCache = _lengthCache.length === 0 ? 0 : _lengthCache[_lengthCache.length - 1].value;
    let lastDbStart = parseInt(_lengthCache / TRANSACTION_KEY_LENGTH) * TRANSACTION_KEY_LENGTH;
    let lastDbName = `transaction_${lastDbStart}_to_${lastDbStart+TRANSACTION_KEY_LENGTH}`;
    let lastDb = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: lastDbName
    });
    let arr = data.concat(lastDb);
    // insert data
    let dataArr = [];
    let addrCacheLength = this.addressObj.list.length;
    let dayTransactionLength = this.dayTransaction.length;
    for (let i = lastDb.length; i < arr.length; i++) {
      if ((i + 1) % TRANSACTION_KEY_LENGTH === 0) {
        await this.indexDB.updateData({
          indexDbName: 'transaction',
          key: lastDbName,
          data: dataArr
        });
        lastDbStart += TRANSACTION_KEY_LENGTH;
        lastDbName = `transaction_${lastDbStart}_to_${lastDbStart+TRANSACTION_KEY_LENGTH}`;
        dataArr = [];
        // update transaction length;
        await this.indexDB.updateData({
          indexDbName: 'transaction',
          key: 'length',
          data: [{
            value: lastDbStart
          }]
        });
        let heightByHashTx = await this.rpcClient.getBlockHeightByTxHash(arr[i].TxHash);
        await this.indexDB.updateData({
          indexDbName: 'transaction',
          key: 'height',
          data: [{
            value: heightByHashTx.result
          }]
        })
      } else if (i === (arr.length - 1)) {
        await this.indexDB.insertData({
          indexDbName: 'transaction',
          key: lastDbName,
          data: dataArr
        });
        await this.indexDB.updateData({
          indexDbName: 'transaction',
          key: 'length',
          data: [{
            value: lastDbStart
          }]
        });
        let heigthByHashTx = await this.rpcClient.getBlockHeightByTxHash(arr[i].TxHash);
        await this.indexDB.updateData({
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
      this.syncAddress(arr[i]);
    }
    let insertAddrArr = this.addressObj.list.slice(addrCacheLength);
    let insertTransactionArr = this.dayTransaction.slice(dayTransactionLength);
    this.indexDB.insertData({
      indexDbName: 'address',
      key: 'addressList',
      data: insertAddrArr
    });
    this.indexDB.insertData({
      indexDbName: 'transaction',
      key: 'dayTransaction',
      data: insertTransactionArr
    });
    this.loading.address = false;
  }

  // async toSyncTransaction({
  //   data
  // }) {
  //   this.loading.address = true;
  //   this.addressObj = await this.getAddressCache();
  //   this.dayTransaction = await this.getDayTransactionCache();

  //   let _lengthCache = await this.indexDB.findData({
  //     indexDbName: 'transaction',
  //     key: 'length'
  //   });
  //   _lengthCache = _lengthCache.length === 0 ? 0 : _lengthCache[_lengthCache.length - 1].value;
  //   let lastDbStart = parseInt(_lengthCache / TRANSACTION_KEY_LENGTH) * TRANSACTION_KEY_LENGTH;
  //   // let lastDbName = `transaction_${lastDbStart}_to_${lastDbStart+TRANSACTION_KEY_LENGTH}`;
  //   let NAME = 'transaction_list'
  //   let lastDb = await this.indexDB.findData({
  //     indexDbName: 'transaction',
  //     key: NAME
  //   });
  //   lastDb = this.context.Util.flatArr(lastDb);
  //   let arr = data.concat(lastDb);
  //   // insert data
  //   let dataArr = '';
  //   let addrCacheLength = this.addressObj.list.length;
  //   let dayTransactionLength = this.dayTransaction.length;
  //   let index = Math.ceil(addrCacheLength / TRANSACTION_KEY_LENGTH);
  //   for (let i = lastDb.length; i < arr.length; i++) {
  //     if ((i + 1) % TRANSACTION_KEY_LENGTH === 0) {
  //       let _index = parseInt(i + 1 / TRANSACTION_KEY_LENGTH);
  //       dataArr = dataArr.substring(1);

  //       if(index === _index) {
  //         await this.indexDB.updateData({
  //           indexDbName: 'transaction',
  //           key: NAME,
  //           keyPath: index,
  //           data: [dataArr]
  //         });
  //       } else {
  //         await this.indexDB.insertData({
  //           indexDbName: 'transaction',
  //           key: NAME,
  //           data: [dataArr]
  //         });
  //       }
  //       lastDbStart += TRANSACTION_KEY_LENGTH;
  //       // lastDbName = `transaction_${lastDbStart}_to_${lastDbStart+TRANSACTION_KEY_LENGTH}`;
  //       dataArr = '';
  //       // update transaction length;
  //       await this.indexDB.updateData({
  //         indexDbName: 'transaction',
  //         key: 'length',
  //         data: [{
  //           value: lastDbStart
  //         }]
  //       });
  //       let heightByHashTx = await this.rpcClient.getBlockHeightByTxHash(arr[i].TxHash);
  //       await this.indexDB.updateData({
  //         indexDbName: 'transaction',
  //         key: 'height',
  //         data: [{
  //           value: heightByHashTx.result
  //         }]
  //       })
  //     } else if (i === (arr.length - 1)) {
  //       dataArr = dataArr.substring(1);
  //       await this.indexDB.insertData({
  //         indexDbName: 'transaction',
  //         key: NAME,
  //         data: [dataArr]
  //       });
  //       await this.indexDB.updateData({
  //         indexDbName: 'transaction',
  //         key: 'length',
  //         data: [{
  //           value: lastDbStart
  //         }]
  //       });
  //       let heigthByHashTx = await this.rpcClient.getBlockHeightByTxHash(arr[i].TxHash);
  //       await this.indexDB.updateData({
  //         indexDbName: 'transaction',
  //         key: 'height',
  //         data: [{
  //           value: heigthByHashTx.result
  //         }]
  //       })
  //     }
  //     // dataArr.push(arr[i].TxHash);
  //     dataArr += `,${arr[i].TxHash}`;
  //     this.syncAddress(arr[i]);
  //   }
  //   let insertAddrArr = this.addressObj.list.slice(addrCacheLength);
  //   let insertTransactionArr = this.dayTransaction.slice(dayTransactionLength);
  //   this.indexDB.insertData({
  //     indexDbName: 'address',
  //     key: 'addressList',
  //     data: insertAddrArr
  //   });
  //   this.indexDB.insertData({
  //     indexDbName: 'transaction',
  //     key: 'dayTransaction',
  //     data: insertTransactionArr
  //   });
  //   this.loading.address = false;
  // }

  async getAddressList() {
    return new Promise((resolve, reject) => {
      let obj = setInterval(() => {
        if(this.loading.address !== true && this.loading.transation !== true) {
          clearInterval(obj);
          resolve(this.addressObj.list);
        }
      }, 1000)
    });
  }

  async getDayTransactionList() {
    return new Promise((resolve, reject) => {
      let obj = setInterval(() => {
        if(this.loading.address !== true && this.loading.transation !== true) {
          clearInterval(obj);
          resolve(this.dayTransaction);
        }
      }, 1000)
    });
  }

  syncAddress(res) {
    const vm = this;
    if(Object.prototype.toString.call(res.Notify) !== '[object Array]') return;
    for(let item of res.Notify) {
      if(Object.prototype.toString.call(item.States) === '[object Array]' && item.States[0] === 'transfer') {
        let _fromAddr = item.States[1];
        let _toAddr = item.States[2];
        if(!this.addressObj.obj[_fromAddr]) {
          this.addressObj.obj[_fromAddr] = true;
          this.addressObj.list.push(_fromAddr);
        }
        if (!this.addressObj.obj[_toAddr]) {
          this.addressObj.obj[_toAddr] = true;
          this.addressObj.list.push(_toAddr);
        }
      } else if(Object.prototype.toString.call(item.States) === '[object Object]' && item.States.blockHeight) {
        let _index = Math.ceil((item.States.blockHeight - vm.firstDayZeroGoesBlockHeight)/(86400/5));
        if(!vm.dayTransaction[_index]) vm.dayTransaction[_index] = 0;
        vm.dayTransaction[_index] ++;
      }
    }
  }
}
export default Sync;