import Base from './Base'
class Node extends Base {
  constructor(context) {
    super(context);
  }

  async getNodes() {
    const vm = this;
    let res = new this.Res();
    let height = await this.context.service.Block.getBlockHeight();
    return Promise.all([
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 5, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 6, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvjPTx9sq', 1, 1, height, ""),
      vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvjPTx9sq', 2, 1, height, ""),
    ]).then(async ResponseArr => {
      for (let Response of ResponseArr) {
        if (Response.error !== 0) {
          res.setError(Response.error);
          return res.get();
        };
      }

      let fsObj = {};
      let dnsObj = {};
      for(let value of ResponseArr[0].result) {
        for(let i = 0;i < value.Notify.length; i ++) {
          let item = value.Notify[i];
          if(item.States && Object.prototype.toString.call(item.States) === "[object Object]") {
            if(fsObj[item.States.walletAddr] === undefined) fsObj[item.States.walletAddr] = [];
            fsObj[item.States.walletAddr].push({
              Storage: item.States["volume"],
              Address: item.States["nodeAdd"],
              walletAddr: item.States.walletAddr,
              Alias: item.States["nodeAdd"],
              Region: "",
              ProfitFormat: 0
            });
            continue;
          }
        }
      }

      for(let value of ResponseArr[1].result) {
        // for(let item of value.Notify) {
        for(let i = 0;i < value.Notify.length; i ++) {
          let item = value.Notify[i];
          if(item.States && Object.prototype.toString.call(item.States) === "[object Object]") {
            if(fsObj[item.States.walletAddr].length === 1)
              delete fsObj[item.States.walletAddr];
            else 
              fsObj[item.States.walletAddr].shift();
            continue;
          }
        }
      }

      for(let value of ResponseArr[2].result) {
        // for(let item of value.Notify) {
        for(let i = 0;i < value.Notify.length; i ++) {
          let item = value.Notify[i];
          if(item.States && !(item.States instanceof Array)) {
            let _address = item.States.walletAddr.toString();
            if(dnsObj[_address] === undefined) dnsObj[_address] = [];
            let _ip = vm.context.Util.decodeToStringByBase64(item.States.ip)
            dnsObj[_address].push({
              Alias: _ip,
              Region: "",
              walletAddr: _address,
              IP: _ip,
              ChannelCount: 0,
              Stake: item.States.deposit/Math.pow(10, 9)
            });
            continue;
          }
        }
      }

      for(let value of ResponseArr[3].result) {
        // for(let item of value.Notify) {
        for(let i = 0;i < value.Notify.length; i ++) {
          let item = value.Notify[i];
          if(item.States && Object.prototype.toString.call(item.States) === "[object Object]") {
            let _address = item.States.walletAddr.toString();
            if(dnsObj[_address].length === 1)
              delete dnsObj[_address];
            else 
              dnsObj[_address].shift();
            continue;
          }
        }
      }

      let fsArr = [];
      let dnsArr = [];
      for(let key in fsObj) {
        fsArr.push(fsObj[key][0]);
      }
      for(let key in dnsObj) {
        dnsArr.push(dnsObj[key][0]);
      }

      dnsArr.map(item => {
        let _walletAddrArr = item.walletAddr.split(',');
        let hexStr = vm.context.Ont.utils.ab2hexstring(_walletAddrArr);
        let addr = new vm.context.Ont.Crypto.Address(hexStr);
        item['walletAddr'] = addr.toBase58();
        return item;
      });

      fsArr.map(item => {
        let ipLastIndex = item.Address.lastIndexOf(':');
        let _ip = item.Address.slice(6, ipLastIndex);
        item['IP'] = _ip;
        return item;
      })

      
      let _result = {
        Online: 0,
        Offline: 0,
        DNS: dnsArr,
        FS: fsArr
      }

      await vm.perfectResult(_result, height);

      res.setResult(_result);
      return res.get();
    })
  }
  async perfectResult(result, height) {
    const vm = this;
    let commitAll = [];
    for(let value of result.DNS) {
      let address = value.walletAddr;
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 1, 1, height, address)
      )
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbviRj6Fv6', 2, 1, height, address)
      )
      commitAll.push(
        vm.rpcClient.getRegionByIpPromise(value.IP)
      )
    }
    for(let value of result.FS) {
      let address = value.walletAddr;
      commitAll.push(
        vm.rpcClient.getsmartcodeeventbyeventidandheights('AFmseVrdL9f9oyCzZefL9tG6UbvhzQYRMK', 7, 1, height, address)
      )
      commitAll.push(
        vm.rpcClient.getRegionByIpPromise(value.IP)
      )
    }

    return Promise.all(commitAll).then(ResponseArr => {
      for(let i = 0;i < result.DNS.length;i ++) {
        let item = result.DNS[i];
        item['ChannelCount'] = ResponseArr[(3 * i)].result.length - ResponseArr[(3 * i + 1)].result.length;
        let _index = ResponseArr[(3 * i + 2)].loc.indexOf(',');
        item['lng'] = ResponseArr[(3 * i + 2)].loc.slice(_index + 1);
        item['lat'] = ResponseArr[(3 * i + 2)].loc.slice(0, _index);
        item['Region'] = ResponseArr[(3 * i + 2)].city;
      }
      for(let i = 0;i < result.FS.length; i ++) {
        let item = result.FS[i];
        let resItem = ResponseArr[(result.DNS.length * 3) + (i * 2)].result;
        for(let value of resItem) {
          for(let j = 0; j < value.Notify.length; j ++) {
            let notifyItem = value.Notify[j];
            if(Object.prototype.toString.call(notifyItem.States) === '[object Object]' && notifyItem.States.profit !== undefined) {
              item["ProfitFormat"] += notifyItem.States.profit;
            }
          }
        }
        item["ProfitFormat"] = item["ProfitFormat"]/Math.pow(10, 9);
        let _index = ResponseArr[(result.DNS.length * 3) + (i * 2) + 1].loc.indexOf(',');
        item['lng'] = ResponseArr[(result.DNS.length * 3) + (i * 2) + 1].loc.slice(_index + 1);
        item['lat'] = ResponseArr[(result.DNS.length * 3) + (i * 2) + 1].loc.slice(0, _index);
        item['Region'] = ResponseArr[(result.DNS.length * 3) + (i * 2) + 1].city;
      }
      return result;
    })
  }
}
export default Node;