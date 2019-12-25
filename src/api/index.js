import Res from './res'

const Ont = require('./../../static/lib/index');
const rpcAddr = "http://10.0.1.201:20336";
const rpcClient = new Ont.RpcClient(rpcAddr);

import axios from 'axios';
import Util from '../assets/tool/util';
import cache from './data/index'

/**
 * rewrite rpcClient function
 */
rpcClient.getsmartcodeeventbyeventidandheights = (contract, eventId, startHeight, endHeight, address) => {
  let req = makeRequest('getsmartcodeeventbyeventidandheights', contract, eventId, startHeight, endHeight, address)
  return axios.post(rpcAddr, req).then(Response => {
    return Response.data;
  })
}
rpcClient.getBlockHeight = () => {
  const req = makeRequest('getblockcount');
  return axios.post(rpcAddr, req).then(Response => {
    return Response.data;
  });
}

rpcClient.getRegionByIpPromise = (ip) => {
  return axios.get(`https://ipinfo.io/${ip}`, {},{
    Headers: {
      'user-agent': 'curl/7.64.1',
      'content-yype': 'application/json',
      "accept": "*/*",
      "host": "ipinfo.io",
      "connection": "keep-alive"
    }
  }).then(Response => {
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
    this.Ont = Ont;
    this.service = new Service(this);
    this.Util = Util;
    this.cache = new cache(this);
  }

  async getBlockHeight() {
    let res = await this.service.Block.getBlockHeight();
    return res;
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

  async syncTransaction() {
    let result = await this.service.Transaction.syncTransaction();
    return result;
  }

  async getAddressLength() {
    let result = await this.service.Transaction.getAddressLength();
    return result;
  }

  async getTransactionStat({
    days
  }) {
    let result = await this.service.Transaction.getTransactionStat({days});
    return result;
  }

  async getStakeStat({
    days
  }) {
    let result = await this.service.Stat.getStakeStat({days});
    return result;
  }

  async getBlocks({offset, limit}) {
    let result = await this.service.Block.getBlocks({offset, limit });
    return result;
  }

  async getTransactions({
    offset,
    limit
  }) {
    let result = await this.service.Transaction.getTransactions({
      offset,
      limit
    });
    return result;
  }

  async getBlockbyHeight(height) {
    let result = await this.service.Block.getBlockbyHeight(height);
    return result;
  }

  async getTransactionbyHeight(height) {
    let result = await this.service.Transaction.getTransactionbyHeight(height);
    return result;
  }

  async getTransactionByAddress(address) {
    let result = await this.service.Transaction.getTransactionByAddress(address);
    return result;
  }

  async getRawTransactionJson(txHash) {
    let result = await this.service.Transaction.getRawTransactionJson(txHash);
    return result;
  }

  async getNodes() {
    let result = await this.service.Node.getNodes();
    return result;
  }

  async getTypeByContent(val) {
    let result = await this.service.Other.getTypeByContent(val);
    return result;
  }
}

export default API
