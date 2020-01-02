const TRANSACTION_KEY_LENGTH = 1000;
import Base from './../../service/Base';
import IndexDB from './../db/indexDb'
class Sync extends Base {
  constructor(context) {
    super(context);
    this.indexDB = new IndexDB();

    this.txCache = {
      height: 0,
      length: 0,
      total: 0,
    }
    this.txDbCache = {};
    this.transactionList = [];
    this.cacheTransactionList = {};

    this.dayTransaction = [];
    this.addressObj = {};
    this.loading = {
      transaction: false,
      transactionIsFirst: true,
      address: false
    }
    this.NAME = 'transaction_list'
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

  async getDayTransactionCache() {
    if(this.dayTransaction.length > 0) {
      return this.dayTransaction;
    }
    let _dayTransactionCacheList = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: 'dayTransaction'
    });
    if(!_dayTransactionCacheList || _dayTransactionCacheList.length === 0) return [];
    else return _dayTransactionCacheList[_dayTransactionCacheList.length - 1];
  }

  async getAddressCache() {
    if(this.addressObj.obj) {
      return this.addressObj
    }
    let _addressCacheList = await this.indexDB.findData({
      indexDbName: 'address',
      key: 'addressList'
    });
    _addressCacheList = _addressCacheList.length === 0 ? [] : _addressCacheList;
    // let _addressObj = this.context.Util.listToObj(_addressCacheList);
    let _addressObj = await this.indexDB.findData({
      indexDbName: 'address',
      key: 'firstTransactionBlock'
    });
    let _obj = _addressObj.length === 0 ? {} : _addressObj[0]
    let result = {
      obj: _obj,
      list: _addressCacheList
    }
    return result;
  }

  async getTransactionsTxCb(offset, limit) {
    const vm = this;
    let result;
    if (offset === 0) {
      result = this.transactionList.slice(vm.txCache.total - vm.txCache.length - limit - offset);
    } else {
      result = this.transactionList.slice(vm.txCache.total - vm.txCache.length - limit - offset, vm.txCache.total - vm.txCache.length - offset);
    }
    if(result.length < limit) {
      let arr = await vm.getCacheTransacation({
        limit: (limit - result.length),
        offset: (vm.txCache.total - offset -limit)
      })
      let arr2 = [];
      for(let value of arr) {
        arr2.push({
          TxHash: value
        })
      }
      result = arr2.concat(result);
    }
    return result;
  }  

  async getTransactionsTx({
    offset,
    limit
  }) {
    const vm = this;
    return new Promise(async (resolve,reject) => {
      if(this.loading.transactionIsFirst !== true) {
        let result = await vm.getTransactionsTxCb(offset, limit);
        resolve(result);
        return;
      }
      let obj = setInterval(async () => {
        if(this.loading.transactionIsFirst !== true) {
          clearInterval(obj);
          let result = await vm.getTransactionsTxCb(offset, limit);
          resolve(result);
        }
      }, 200)
    });
  }

  async getCacheTransacation({
    offset,
    limit
  }) {
    const vm = this;
    if(offset + limit <= 0) return [];
    // 数据在第一个表
    if(offset < 0) {
      limit = offset + limit;
      offset = 0;
      // check cache
      if(!this.txDbCache['1']) {
        this.txDbCache['1'] = await this.indexDB.findData({
          indexDbName: 'transaction',
          key: vm.NAME,
          keyPath: 1
        });
      }
      return this.txDbCache['1'].slice(offset,(offset + limit));
    };
    // 数据存在于一个表
    if(parseInt(offset / TRANSACTION_KEY_LENGTH) === parseInt((offset + limit) / TRANSACTION_KEY_LENGTH)) {
      let keyPath = parseInt(offset / TRANSACTION_KEY_LENGTH) + 1;
      // check cache
      if(!this.txDbCache[keyPath.toString()]) {
        this.txDbCache[keyPath.toString()] = await this.indexDB.findData({
          indexDbName: 'transaction',
          key: vm.NAME,
          keyPath: keyPath
        });
      }
      return this.txDbCache[keyPath.toString()].slice((offset%TRANSACTION_KEY_LENGTH),(offset%TRANSACTION_KEY_LENGTH + limit));
    }
    // 数据存在于两个表
    if(parseInt(offset / TRANSACTION_KEY_LENGTH) !== parseInt((offset + limit) / TRANSACTION_KEY_LENGTH)) {
      let keyPath0 = parseInt(offset / TRANSACTION_KEY_LENGTH) + 1;
      if(!this.txDbCache[keyPath0.toString()]) {
        this.txDbCache[keyPath0.toString()] = await this.indexDB.findData({
          indexDbName: 'transaction',
          key: vm.NAME,
          keyPath: keyPath0
        });
      }

      let keyPath1 = parseInt((offset + limit) / TRANSACTION_KEY_LENGTH) + 1;
      if(!this.txDbCache[keyPath1.toString()]) {
        this.txDbCache[keyPath1.toString()] = await this.indexDB.findData({
          indexDbName: 'transaction',
          key: vm.NAME,
          keyPath: keyPath1
        });
        
      }
      let list = this.txDbCache[keyPath0.toString()].concat(this.txDbCache[keyPath1.toString()]);

      return list.slice((offset%TRANSACTION_KEY_LENGTH),(offset%TRANSACTION_KEY_LENGTH + limit));
    }
  }

  async syncTransaction() {
    const vm = this;
    if(this.loading.transaction === true) {
      return false;
    }
    this.loading.transaction = true;
    if(this.transactionList.length > 0) {
      return this.transactionList;
    }

    let height = await this.context.service.Block.getBlockHeight();

    await this.updateCacheHeight();
    await this.updateCacheLength();

    let transactionResult = await this.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 0, (vm.txCache.height + 1), height, "");
    if(transactionResult.error !== 0) {
      return transactionResult.error;
    }
    this.transactionList = transactionResult.result;
    this.txCache.total = this.transactionList.length + this.txCache.length;

    this.loading.transaction = false;
    this.loading.transactionIsFirst = false;

    this.toSyncTransaction({data: transactionResult.result});
    return this.transactionList;
  }

  async toSyncTransaction2({
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

  async updateCacheHeight() {
    return new Promise(async (resolve, reject) => {
      let _heightCache = await this.indexDB.findData({
        indexDbName: 'transaction',
        key: 'height'
      });
      if(!_heightCache || _heightCache.length === 0) {
        this.txCache.height = 0;
        resolve();
      } else {
        let _max = 0;
        for(let value of _heightCache) {
          if(value.value > _max) _max = value.value;
        }
        this.txCache.height = _max;
        resolve();
      }
    })
  }

  async updateCacheLength() {
    let _lengthCache = await this.indexDB.findData({
      indexDbName: 'transaction',
      key: 'length'
    });
    if(!_lengthCache || _lengthCache.length === 0) {
      this.txCache.length = 0  
    } else {
      let _max = 0;
      for(let value of _lengthCache) {
        if(value.value > _max) _max = value.value;
      }
      this.txCache.length = _max;
    }
  }

  async toSyncTransaction({
    data
  }) {
    const vm = this;
    this.loading.address = true;
    this.addressObj = await this.getAddressCache();
    this.dayTransaction = await this.getDayTransactionCache();

    let cacheLength = vm.txCache.length;
    let arr = data;
    let dataArr = [];

    let addrCacheLength = this.addressObj.list.length;

    for (let i = 0; i < arr.length; i++) {
      if (i % TRANSACTION_KEY_LENGTH === 0 && i !== 0) {
        let _txHash = dataArr[dataArr.length - 1];
        await this.indexDB.insertData({
          indexDbName: 'transaction',
          key: vm.NAME,
          data: [dataArr]
        });
        cacheLength += TRANSACTION_KEY_LENGTH;
        dataArr = [];
        
        // update address
        let insertAddrArr = this.addressObj.list.slice(addrCacheLength);
        addrCacheLength = this.addressObj.list.length;
        this.indexDB.insertData({
          indexDbName: 'address',
          key: 'addressList',
          data: insertAddrArr
        });

        await this.indexDB.updateData({
          indexDbName: 'address',
          key: 'firstTransactionBlock',
          data: [vm.addressObj.obj]
        });

        // update day total transaction
        await this.indexDB.updateData({
          indexDbName: 'transaction',
          key: 'dayTransaction',
          data: [vm.dayTransaction]
        });
        
        // update transaction length;
        this.indexDB.updateData({
          indexDbName: 'transaction',
          key: 'length',
          data: [{
            value: cacheLength
          }]
        })
        this.rpcClient.getBlockHeightByTxHash(_txHash).then(heightByHashTx => {
          if(heightByHashTx.error === 0) {
            let _height = heightByHashTx.result;
            vm.indexDB.updateData({
              indexDbName: 'transaction',
              key: 'height',
              data: [{
                value: _height
              }]
            })
          }
        })
      } 
      dataArr.push(arr[i].TxHash);
      this.syncAddress(arr[i]);
    }
    this.loading.address = false;
  }

  async getAddressList() {
    return new Promise((resolve, reject) => {
      if(this.loading.address !== true && this.loading.transactionIsFirst !== true) {
        resolve(this.addressObj.list);
        return;
      }
      let obj = setInterval(() => {
        if(this.loading.address !== true && this.loading.transactionIsFirst !== true) {
          clearInterval(obj);
          resolve(this.addressObj.list);
        }
      }, 1000)
    });
  }

  async getDayTransactionList() {
    return new Promise((resolve, reject) => {
      if(this.loading.address !== true && this.loading.transactionIsFirst !== true) {
        resolve(this.dayTransaction);
        return;
      }
      let obj = setInterval(() => {
        if(this.loading.address !== true && this.loading.transactionIsFirst !== true) {
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
          this.addressObj.obj[_fromAddr] = item.States[4];
          this.addressObj.list.push(_fromAddr);
        }
        if (!this.addressObj.obj[_toAddr]) {
          this.addressObj.obj[_toAddr] = item.States[4];
          this.addressObj.list.push(_toAddr);
        }

        let _index = Math.ceil((item.States[4] - vm.firstDayZeroGoesBlockHeight)/(86400/5));
        if(!vm.dayTransaction[_index]) vm.dayTransaction[_index] = 0;
        vm.dayTransaction[_index] ++;
      }
    }
  }
}
export default Sync;