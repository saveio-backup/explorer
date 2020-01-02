const HOST = '/'
const VERSION = 'v1/'
const API = {
  host: HOST,
  getcountstat: HOST + VERSION + 'count/stat',
  getstoragestat: HOST + VERSION + 'storage/stat',
  getprofitstat: HOST + VERSION + 'profit/stat',
  getfilestat: HOST + VERSION + 'file/stat',
  getchannelstat: HOST + VERSION + 'channel/stat',
  gettransactionstat: HOST + VERSION + 'transaction/stat',
  getstakestat: HOST + VERSION + 'stake/stat',
  getaddressstat: HOST + VERSION + 'address/stat',
  getblocks: HOST + VERSION + 'blocks',
  getblockbyheight: HOST + VERSION + 'blockbyheight',
  getblockbyhash: HOST + VERSION + 'blockbyhash',
  gettxbyaddr: HOST + VERSION + 'txbyaddr',
  gettransactions: HOST + VERSION + 'transactions',
  gettransactionbyhash: HOST + VERSION + 'transactionbyhash',
  getnodes: HOST + VERSION + 'nodes'
}

export default API;