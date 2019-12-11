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
    ]).then(ResponseArr => {
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
              Alias: item.States["nodeAdd"],
              Region: "",
              ProfitFormat: ""
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
      let _result = {
        Online: 0,
        Offline: 0,
        DNS: dnsArr,
        FS: fsArr
      }
      res.setResult(_result);
      return res.get();
    })
  }
}
export default Node;