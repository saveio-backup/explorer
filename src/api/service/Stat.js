import Base from './Base'
import {
  RSA_NO_PADDING
} from 'constants';
class Stat extends Base {
  constructor(context) {
    super(context)
  }

  /**
   * get current block height、node count and total channel
   * @return {Res} BlockHeight,NodeCount,TotalChannels
   */
  async getCountStat() {
    const vm = this;
    let res = new this.Res();
    let height = await this.context.service.Block.getBlockHeight();
    return Promise.all([vm.rpcClient.getBlockHeight(),
      vm.rpcClient.getNodeCount(),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 1, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 2, 1, height, "")
    ]).then(ResponseArr => {
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }
      let result = {
        BlockHeight: ResponseArr[0].result,
        NodeCount: ResponseArr[1].result,
        TotalChannels: (ResponseArr[2].result.length - ResponseArr[3].result.length)
      }
      res.setResult(result);
      return res.get();
    }).catch(error => {
      console.log(error);
      res.setError(500);
      return res.get();
    })
  }

  /**
   * get storage detail
   * @return {Res} storage detail
   */
  async getStorageStat() {
    const vm = this;
    let res = new this.Res();
    let height = await this.context.service.Block.getBlockHeight();
    let todayGoesBlockNumber = await this.context.service.Block.getTodayGoesBlockNumber();
    let goesDays = Math.ceil((height - todayGoesBlockNumber) / 17280) + 1;
    return Promise.all([
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 5, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 6, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 1, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 2, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 3, 1, height, ""),
    ]).then(ResponseArr => {
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }


      let totalList = this.getTotalStorageList({
        registerList: ResponseArr[0].result,
        unRegisterList: ResponseArr[1].result,
        goesDays,
        todayGoesBlockNumber
      });

      let fileStorageList = this.getFileStorageList({
        addList: ResponseArr[2].result,
        deletesList: ResponseArr[3].result,
        deleteList: ResponseArr[4].result,
        goesDays,
        todayGoesBlockNumber
      });
      let result = this.formatStorageResult(totalList,fileStorageList);

      console.log("result");
      console.log(result);
      res.setResult(result);
      return res.get();
    })
  }

  /**
   * fromat storage result 
   * @param {Array} totalList 
   * @param {Array} fileStorageList 
   * @return {Object} storage detail about total used、remain used and storage list
   */
  formatStorageResult(totalList, fileStorageList) {
    let currentTimestamp = (new Date()).getTime() / 1000;
    let details = [];
    for(let i = 0;i < totalList.length;i ++) {
      let used = fileStorageList[i];
      let remain = totalList[i] - fileStorageList[i];
      if(remain < 0) remain = 0;
      let updatedAt = currentTimestamp - (86400 * (totalList.length - 1 - i))
      details.unshift({
        Used: used,
        Remain: remain,
        UpdatedAt: updatedAt
      })
    }
    let result = {
      Used: details[0].Used,
      Remain: details[0].Remain,
      Details: details
    }
    return result;
  }

  /**
   * get file storage space list
   * @param {Array} addList 
   * @param {Array} deletesList 
   * @param {Array} deleteList 
   * @param {Number} goesDays 
   * @param {Number} todayGoesBlockNumber 
   * @return {Array} used space list
   */
  getFileStorageList({
    addList,
    deletesList,
    deleteList,
    goesDays,
    todayGoesBlockNumber
  }) {
    // get file total
    let fsUsedList = new Array(goesDays).fill(0);
    let fsDeletesList = new Array(goesDays).fill(0);
    let fsDeleteList = new Array(goesDays).fill(0);
    let usedPrevIndex = 0;
    let fileObj = {};
    // get add file list storage list
    for (let value of addList) {
      for (let item of value.Notify) {
        if (item.States && Object.prototype.toString.call(item.States) === "[object Object]") {
          let index = 0;
          if (fileObj[item.States.fileHash]) index = fileObj[item.States.fileHash].index;
          index++;
          fileObj[item.States.fileHash] = {
            fileSize: item.States.fileSize,
            index: index
          };

          let currentUsedIndex = Math.ceil((item.States.blockHeight - todayGoesBlockNumber) / 17280);
          fsUsedList[usedPrevIndex] += item.States.fileSize;
          fsUsedList.fill(fsUsedList[usedPrevIndex], usedPrevIndex, currentUsedIndex + 1);
          usedPrevIndex = currentUsedIndex;
        }
      }
    }
    fsUsedList.fill(fsUsedList[usedPrevIndex], usedPrevIndex);

    // get delete file storage total
    usedPrevIndex = 0;
    for (let value of deleteList) {
      for (let item of value.Notify) {
        if (item.States && Object.prototype.toString.call(item.States) === "[object Object]") {
          let currentUsedIndex = Math.ceil((item.States.blockHeight - todayGoesBlockNumber) / 17280);
          fsDeleteList[usedPrevIndex] += fsObj[item.States.fileHash].fileSize;
          fsDeleteList.fill(fsDeleteList[usedPrevIndex], usedPrevIndex, currentUsedIndex + 1);
          usedPrevIndex = currentUsedIndex;

          if (!fileObj[item.States.fileHash] || fileObj[item.States.fileHash].index === 1)
            delete fileObj[item.States.fileHash];
          else
            fileObj[item.States.fileHash].index--;
        }
      }
    }
    fsDeleteList.fill(fsDeleteList[usedPrevIndex], usedPrevIndex);

    // get delete file storage total
    usedPrevIndex = 0;
    for (let value of deletesList) {
      let deleteObj = null;
      for (let item of value.Notify) {
        if (item.States && Object.prototype.toString.call(item.States) === "[object Object]") {
          deleteObj = item;
          break;
        }
      }
      let currentUsedIndex = Math.ceil((deleteObj.States.blockHeight - todayGoesBlockNumber) / 17280);
      for (let fileHash of deleteObj.States.fileHashes) {
        fsDeletesList[usedPrevIndex] += fileObj[fileHash].fileSize;
        fsDeletesList.fill(fsDeletesList[usedPrevIndex], usedPrevIndex, currentUsedIndex + 1);
        usedPrevIndex = currentUsedIndex;

        if (!fileObj[fileHash] || fileObj[fileHash].index === 1)
          delete fileObj[fileHash]
        else
          fileObj[fileHash].index--;
      }
    }
    fsDeletesList.fill(fsDeletesList[usedPrevIndex], usedPrevIndex);

    // get exist file storage list
    let totalArr = [];
    for (let i = 0;i < fsUsedList.length; i ++) {
      let value = fsUsedList[i] - fsDeleteList[i] - fsDeletesList[i];
      totalArr.push(value);
    }
    return totalArr;
  }

  /**
   * get total space list
   * @param {Array} registerList 
   * @param {Array} unRegisterList 
   * @param {Number} goesDays 
   * @param {Number} todayGoesBlockNumber 
   * @return {Array} total space list
   */
  getTotalStorageList({
    registerList,
    unRegisterList,
    goesDays,
    todayGoesBlockNumber
  }) {
    let fsObj = {};
    let fsRegisterTotalList = new Array(goesDays).fill(0);
    let totalPrevIndex = 0;
    // get register list about day
    for (let value of registerList) {
      for (let item of value.Notify) {
        if (Object.prototype.toString.call(item.States) !== "[object Object]") continue;
        let index = 0;
        if (fsObj[item.States.walletAddr]) index = fsObj[item.States.walletAddr].index;
        index++;
        fsObj[item.States.walletAddr] = {
          volume: item.States.volume,
          index: index
        };

        let currentTotalIndex = Math.ceil((item.States.blockHeight - todayGoesBlockNumber) / 17280);
        fsRegisterTotalList[totalPrevIndex] += item.States.volume;
        fsRegisterTotalList.fill(fsRegisterTotalList[totalPrevIndex], totalPrevIndex, currentTotalIndex + 1);
        totalPrevIndex = currentTotalIndex;
      }
    }
    fsRegisterTotalList.fill(fsRegisterTotalList[totalPrevIndex], totalPrevIndex);

    // get unregister list about day
    totalPrevIndex = 0;
    let totalUnregisterList = new Array(goesDays).fill(0)
    for (let value of unRegisterList) {
      for (let item of value.Notify) {
        if (Object.prototype.toString.call(item.States) === "[object Object]") {
          let currentTotalIndex = Math.ceil((item.States.blockHeight - todayGoesBlockNumber) / 17280);
          totalUnregisterList[totalPrevIndex] += fsObj[item.States.walletAddr].volume;
          totalUnregisterList.fill(totalUnregisterList[totalPrevIndex], totalPrevIndex, currentTotalIndex + 1);
          totalPrevIndex = currentTotalIndex;

          if (!fsObj[item.States.walletAddr] || fsObj[item.States.walletAddr].index === 1)
            delete fsObj[item.States.walletAddr];
          else
            fsObj[item.States.walletAddr].index--;
        };
      }
    }
    totalUnregisterList.fill(totalUnregisterList[totalPrevIndex], totalPrevIndex);

    let arr = [];
    for (let i = 0; i < fsRegisterTotalList.length; i++) {
      let value = fsRegisterTotalList[i] - totalUnregisterList[i];
      arr.push(value);
    }

    return arr
  }

  /**
   * get profit day list by day number
   * @param {Number/undefined} days 
   * @return {Res} profit list
   */
  async getProfitStatByDay({
    days = 10000
  }) {
    const vm = this;
    let res = new this.Res();
    // format req list
    let currentheight = await this.context.service.Block.getBlockHeight();
    let todayBlockNumber = this.context.service.Block.getTodayGoesBlockNumber();
    const commitAll = [];
    let endBlock = currentheight;
    let i = 0;
    while(i < days && endBlock > 1) {
      let startBlock = currentheight - todayBlockNumber - (17280 * i);
      startBlock < 1 ? 1 : startBlock;
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 7, startBlock, endBlock, "")
      )
      endBlock = startBlock;
      i ++;
    }

    return Promise.all(commitAll).then(async ResponseArr => {
      console.log(ResponseArr);
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }

      // format response
      let arr = [];
      for (let i = 0; i < ResponseArr.length; i++) {
        let startBlock = currentheight - todayBlockNumber - (17280 * i) + 2;
        let timestamp = await vm.context.service.Block.getTimestampByBlock(startBlock);
        let Response = ResponseArr[i];
        let profit = 0;
        for (let item of Response.result) {
          if (!item.Notify || Object.prototype.toString.call(item.Notify) !== '[object Array]') continue;
          for (let _notifyItem of item.Notify) {
            if (Object.prototype.toString.call(_notifyItem.States) !== '[object Object]') {
              continue;
            } else {
              profit += _notifyItem.States.profit;
              break;
            }
          }
        }
        arr.push({
          StorageProfitFormat: (profit / Math.pow(10, 9)),
          ChannelProfitFormat: "0",
          IndexProfitFormat: "0",
          UpdatedAt: timestamp
        })
      }
      res.setResult(arr)
      return res.get();
    })
  }

  /**
   * get profit month list by month number
   * @param {Number} months
   * @return {Res} profit list 
   */
  async getProfitStatByMonth({
    months
  }) {
    const vm = this;
    let res = new this.Res();
    // format req list
    let currentheight = await this.context.service.Block.getBlockHeight();
    let currentTimestamp = Date.parse(new Date()) / 1000;
    const commitAll = [];
    let startBlock = 1;
    let endBlock = currentheight;
    let timestampArr = []
    for (let i = 0; i < months; i++) {
      let monthGoesBlock = vm.context.service.Block.geMonthGoesBlockNumber(i);
      let monthTimestamp = currentTimestamp - (monthGoesBlock * 5);
      timestampArr.push(monthTimestamp);
      
      startBlock = currentheight - monthGoesBlock;
      if (endBlock <= 1) continue;
      if (startBlock < 1) startBlock = 1
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 7, startBlock, endBlock, "")
      )
      endBlock = startBlock;
    }

    return Promise.all(commitAll).then(async ResponseArr => {
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }
      // format response
      let arr = [];
      for (let i = 0; i < ResponseArr.length; i++) {
        let timestamp = timestampArr[i];
        let Response = ResponseArr[i].result;
        let profit = 0;
        for (let item of Response) {
          if (!item.Notify) continue;
          for (let _notifyItem of item.Notify) {
            if (Object.prototype.toString.call(_notifyItem.States) !== '[object Object]') {
              continue;
            } else {
              profit += _notifyItem.States.profit;
              break;
            }
          }
        }
        arr.push({
          StorageProfitFormat: (profit / Math.pow(10, 9)),
          ChannelProfitFormat: "0",
          IndexProfitFormat: "0",
          UpdatedAt: timestamp
        })
      }
      res.setResult(arr);
      return res.get();
    })
  }

  /**
   * get file total list
   * @param {Number/undefined} days 
   * @return {Res} file list about total space and used space
   */
  async getFileState({days=10000}) {
    const vm = this;
    let res = new this.Res();
    let currentheight = await this.context.service.Block.getBlockHeight();
    let todayBlockNumber = this.context.service.Block.getTodayGoesBlockNumber();
    const commitAll = [];
    let endBlock = currentheight;
    let i = 0;
    while(i < days && endBlock > 1) {
      let startBlock = currentheight - todayBlockNumber - (17280 * i);
      startBlock < 1 ? 1 : startBlock;
      if (i === days - 1) {
        startBlock = 1;
      }
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 1, startBlock, endBlock, "")
      )
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 2, startBlock, endBlock, ""),
      )
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 3, startBlock, endBlock, "")
      )
      endBlock = startBlock;
      i ++;
    }
    return Promise.all(commitAll).then(ResponseArr => {
      console.log(ResponseArr);
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }
      i = ResponseArr.length - 1;
      let addFileLength = 0;
      let deleteFileLength = 0;
      let arr = [];
      let currentTimestamp = (new Date()).getTime() / 1000
      while(i >= 0) {
        addFileLength += ResponseArr[i - 2].result.length;
        deleteFileLength += ResponseArr[i].result.length;
        for(let value of ResponseArr[i - 1].result) {
          for(let item of value.Notify) {
            if(Object.prototype.toString.call(item.States) === "[object Object]") {
              deleteFileLength += item.States.fileHashes.length;
              break;
            }
          }
        }
        let timestamp = currentTimestamp - (((i - 2) / 3) * 86400)
        arr.unshift({
          New: ResponseArr[i - 2].result.length,
          Total: addFileLength - deleteFileLength,
          UpdatedAt: timestamp
        });
        i = i - 3;
      }
      res.setResult(arr);
      return res.get();
    })
  }

  /**
   * get channel total list
   * @param {Number/undefined} days 
   * @return {Res} channel list
   */
  async getChannelStat({days=10000}) {
    const vm = this;
    let res = new this.Res();
    let currentheight = await this.context.service.Block.getBlockHeight();
    const commitAll = [];
    let i = 0;
    let endBlock = currentheight;
    while (i < days && endBlock > 1) {
      let startBlock = currentheight - (86400 / 5 * i)
      if ((i === days - 1) || startBlock < 1) {
        startBlock = 1;
      }
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 1, startBlock, endBlock, "")
      )
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 2, startBlock, endBlock, ""),
      )
      i++;
      endBlock = startBlock;
    }
    return Promise.all(commitAll).then(async ResponseArr => {
      console.log("ResponseArr getChannelStat");
      console.log(ResponseArr);
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }

      let arr = [];
      let total = 0;
      let i = ResponseArr.length - 1;
      let currentTimestamp = Date.parse(new Date()) / 1000;
      while (i >= 0) {
        let _New = ResponseArr[i - 1].result.length - ResponseArr[i].result.length;
        total += _New;
        let _timestamp = currentTimestamp - ((i - 1) / 2 * 86400);
        arr.unshift({
          Total: total,
          New: ResponseArr[i - 1].result.length,
          Close: ResponseArr[i].result.length,
          UpdatedAt: _timestamp
        });

        i = i - 2;
      }
      res.setResult(arr);
      return res.get();
    })
  }

  /**
   * get pledge list about fs and dns
   * @param {Number/undefined} days
   * @return {Res} pledge detail
   */
  async getStakeStat({days=10000}) {
    const vm = this;
    let res = new this.Res();
    let currentheight = await this.context.service.Block.getBlockHeight();
    let todayBlockNumber = this.context.service.Block.getTodayGoesBlockNumber();
    const commitAll = [];
    // for (let i = 0; i < days; i++) {
    let endBlock = currentheight;
    let j = 0;
    while(j < days && endBlock > 1) {
      let startBlock = currentheight - todayBlockNumber - (86400 / 5 * j)
      if (j === days - 1 || startBlock < 1) {
        startBlock = 1;
      }
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvjPTx9sq', 1, startBlock, endBlock, "")
      );
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvjPTx9sq', 2, startBlock, endBlock, "")
      )
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 5, startBlock, endBlock, "")
      );
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 6, startBlock, endBlock, "")
      )
      endBlock = startBlock;
      j ++;
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
      let registerFsObj = {};
      let currentTimestamp = Date.parse(new Date()) / 1000;
      while (i >= 0) {
        let totalDns = 0;
        let totalFs = 0;
        outFor1: for (let value of ResponseArr[i - 3].result) {
          for (let notify of value.Notify) {
            if (notify && Object.prototype.toString.call(notify['States']) === '[object Object]') {
              let _address = notify['States'].walletAddr.toString();
              if (registerObj[_address] === undefined) registerObj[_address] = [];
              registerObj[_address].push(notify['States'].deposit);
              continue outFor1;
            }
          }
        }

        outFor2: for (let value of ResponseArr[i - 2].result) {
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

        for (let value of ResponseArr[i - 1].result) {
          let _address;
          let amount;
          for (let notify of value.Notify) {
            if (notify && Object.prototype.toString.call(notify['States']) === '[object Object]') {
              _address = notify['States'].walletAddr.toString();
              
              // continue outFor3;
            } else if(Object.prototype.toString.call(notify['States']) === '[object Array]'){
              if(notify['States'][3] === 10000000) continue;
              amount = notify['States'][3];
            }
          }
          if (registerFsObj[_address] === undefined) registerFsObj[_address] = [];
          registerFsObj[_address].push(amount);
        }

        outFor4: for (let value of ResponseArr[i].result) {
          for (let notify of value.Notify) {
            if (notify && Object.prototype.toString.call(notify['States']) === '[object Object]') {
              let _address = notify['States'].walletAddr.toString();
              if (registerFsObj[_address].length === 1) {
                delete registerFsObj[_address];
              } else {
                registerFsObj[_address].shift();
              }
              continue outFor4;
            }
          }
        }

        // format result
        for (let key in registerObj) {
          let value = this.context.Util.sum(registerObj[key]);
          totalDns += value;
        }
        totalDns = totalDns / Math.pow(10, 9);
        for(let key in registerFsObj) {
          let value = this.context.Util.sum(registerFsObj[key]);
          totalFs += value;
        }
        totalFs = totalFs / Math.pow(10, 9);
        let _timestamp = currentTimestamp - ((i - 3) / 4 * 86400);
        arr.unshift({
          DNSFormat: totalDns,
          // TO DO!
          FSFormat: totalFs,
          UpdatedAt: _timestamp
        })

        i = i - 4;
      }
      

      res.setResult(arr);
      return res.get();
    });
  }
}

export default Stat;
